
import { Stream } from './shared/Stream';
import { Packet } from './shared/Packet';
import { Activation } from './shared/Activation';
import * as mssql from 'mssql';


async function writeInvalidStreamsToDatabase(streams: Stream[], dbConnection:mssql.ConnectionPool,lastpacketid:number) : Promise<boolean> {
    const transaction = await dbConnection.transaction();
  
    try {
      await transaction.begin();
  
      for (const stream of streams) {
        if (!stream.validity) {
          const streamId = await writeStreamToDb(dbConnection, stream);
          for (const packet of stream.Packets) {
            await writePacketToDb(dbConnection, packet, streamId,lastpacketid);
          }
        }
      }
  
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      console.error('Error writing to database:', error);
      return false;
    }
  
    
  }
  
    async function writeActivationToDb(connection: mssql.ConnectionPool, activation: Activation) : Promise<Activation> {
        const query = `
       INSERT INTO Activation (
      StartTime, 
      IPHOST1, IPHOST2, IPHOST3, IPHOST4, protocols
    ) 
    OUTPUT INSERTED.ActivationID
    VALUES (
      @StartTime, 
      CASE WHEN CONVERT(VARCHAR(MAX), @IPHOST1) = '' THEN NULL ELSE @IPHOST1 END,
      CASE WHEN CONVERT(VARCHAR(MAX), @IPHOST2) = '' THEN NULL ELSE @IPHOST2 END,
      CASE WHEN CONVERT(VARCHAR(MAX), @IPHOST3) = '' THEN NULL ELSE @IPHOST3 END,
      CASE WHEN CONVERT(VARCHAR(MAX), @IPHOST4) = '' THEN NULL ELSE @IPHOST4 END,
      NULLIF(@protocols, 'All')
    )`;
    
  
    try {
      const result=await connection.request()
        .input('StartTime', mssql.DateTime, activation.StartTime)
        .input('IPHOST1', mssql.Text, activation.IPHOST1)
        .input('IPHOST2', mssql.Text, activation.IPHOST2)
        .input('IPHOST3', mssql.Text, activation.IPHOST3)
        .input('IPHOST4', mssql.Text, activation.IPHOST4)
        .input('protocols', mssql.VarChar(40), activation.protocols)
        
        .query(query);

       activation.ActivationID=result.recordset[0].id;
       return activation;
  
    } catch (error) {
      console.error('Error writing activation to database:', error);
      throw error;
    }
  }

  
  
  async function writeStreamToDb(connection: mssql.ConnectionPool, stream: Stream) : Promise<number> {
    // Insert stream into database and return the inserted ID
    const query = `INSERT INTO Stream (connectionID, SourceIP, DestinationIP, ActivationID, Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await connection.request()
      .input('connectionID', mssql.VarChar(255), stream.connectionID)
      .input('SourceIP', mssql.VarChar(45), stream.SourceIP)
      .input('DestinationIP', mssql.VarChar(45), stream.DestinationIP)
      .input('ActivationID', mssql.Int, stream.ActivationID)
      .input('Protocol', mssql.VarChar(10), stream.Protocol)
      .input('validity', mssql.Bit, stream.validity)
      .input('StartTime', mssql.DateTime, stream.StartTime)
      .input('EndTime', mssql.DateTime, stream.EndTime)
      .input('Duration', mssql.Float, stream.Duration)
      .input('PacketCount', mssql.Int, stream.PacketCount)
      .input('DataVolume', mssql.BigInt, stream.DataVolume)
      .input('ApplicationProtocol', mssql.VarChar(50), stream.ApplicationProtocol)
      .query(query);
    return result.recordset[0].id;
  }
  
  async function writePacketToDb(connection: any, packet: Packet, streamId: number,lastpacketid:number) : Promise<void> {

    

    const query = `
      INSERT INTO Packet (
        PacketID, StreamID, SourceIP, DestinationIP, Protocol, Payload, Timestamp, Size, 
        ActivationID, SourceMAC, DestinationMAC, SourcePort, DestinationPort, Flags, 
        FrameLength, ConnectionID, InterfaceAndProtocol, TCPFlagSYN, TCPFlagACK, 
        TCPFlagFIN, TCPFlagRST, TCPFlagPSH, TCPFlagURG, TCPFlagECE, TCPFlagCWR, 
        TCPFlagNS, TCPSeq, TCPAck, TCPChecksumStatus, UDPChecksumStatus, ARPOpcode, 
        IPChecksumStatus, ErrorIndicator, ICMPType, ICMPCode, ICMPChecksumStatus
      ) 
      VALUES (
        @PacketID, @StreamID, @SourceIP, @DestinationIP, @Protocol, @Payload, @Timestamp, @Size, 
        @ActivationID, @SourceMAC, @DestinationMAC, @SourcePort, @DestinationPort, @Flags, 
        @FrameLength, @ConnectionID, @InterfaceAndProtocol, @TCPFlagSYN, @TCPFlagACK, 
        @TCPFlagFIN, @TCPFlagRST, @TCPFlagPSH, @TCPFlagURG, @TCPFlagECE, @TCPFlagCWR, 
        @TCPFlagNS, @TCPSeq, @TCPAck, @TCPChecksumStatus, @UDPChecksumStatus, @ARPOpcode, 
        @IPChecksumStatus, @ErrorIndicator, @ICMPType, @ICMPCode, @ICMPChecksumStatus
      )`;
  
    await connection.request()
      .input('PacketID', mssql.Int, ++lastpacketid)
      .input('StreamID', mssql.Int, streamId)
      .input('SourceIP', mssql.VarChar(45), packet.SourceIP)
      .input('DestinationIP', mssql.VarChar(45), packet.DestinationIP)
      .input('Protocol', mssql.VarChar(10), packet.Protocol)
      .input('Payload', mssql.Text, packet.Payload)
      .input('Timestamp', mssql.DateTime, packet.Timestamp)
      .input('Size', mssql.Int, packet.Size)
      .input('ActivationID', mssql.Int, packet.ActivationID)
      .input('SourceMAC', mssql.    VarChar(17), packet.sourceMAC)
      .input('DestinationMAC', mssql.VarChar(17), packet.destinationMAC)
      .input('SourcePort', mssql.Int, packet.sourcePort)
      .input('DestinationPort', mssql.Int, packet.DestPort)
      .input('Flags', mssql.VarChar(20), packet.flags)
      .input('FrameLength', mssql.Int, packet.frameLength)
      .input('ConnectionID', mssql.VarChar(255), packet.connectionID.toString())
      .input('InterfaceAndProtocol', mssql.VarChar(50), packet.Interface_and_protocol)
      .input('TCPFlagSYN', mssql.Bit, packet.tcpFlags?.syn ? 1 : 0)
      .input('TCPFlagACK', mssql.Bit, packet.tcpFlags?.ack ? 1 : 0 )
      .input('TCPFlagFIN', mssql.Bit, packet.tcpFlags?.fin ? 1 : 0)
      .input('TCPFlagRST', mssql.Bit, packet.tcpFlags?.rst ? 1 : 0)
      .input('TCPFlagPSH', mssql.Bit, packet.tcpFlags?.psh ? 1 : 0)
      .input('TCPFlagURG', mssql.Bit, packet.tcpFlags?.urg ? 1 : 0)
      .input('TCPFlagECE', mssql.Bit, packet.tcpFlags?.ece ? 1 : 0)
      .input('TCPFlagCWR', mssql.Bit, packet.tcpFlags?.cwr ? 1 : 0)
      .input('TCPFlagNS', mssql.Bit, packet.tcpFlags?.ns || false)
      .input('TCPSeq', mssql.BigInt, packet.tcpSeq || null)
      .input('TCPAck', mssql.BigInt, packet.tcpAck || null)
      .input('TCPChecksumStatus', mssql.Int, packet.tcpChecksumStatus || null)
      .input('UDPChecksumStatus', mssql.Int, packet.udpChecksumStatus || null)
      .input('ARPOpcode', mssql.Int, packet.arpOpcode || null)
      .input('IPChecksumStatus', mssql.Int, packet.ipChecksumStatus || null)
      .input('ErrorIndicator', mssql.Bit, packet.errorIndicator || false)
      .input('ICMPType', mssql.Int, packet.icmpType || null)
      .input('ICMPCode', mssql.Int, packet.icmpCode || null)
      .input('ICMPChecksumStatus', mssql.Int, packet.icmpChecksumStatus || null)
      .query(query);


  }

  async function getLastPacketId(connection: mssql.ConnectionPool ): Promise<number> {
    const query = `
      SELECT TOP 1 PacketID
      FROM Packets
      ORDER BY PacketID DESC
    `;
  
    try {
      const result = await connection.request().query(query);
  
      if (result.recordset.length > 0) {
        const lastPacketId = result.recordset[0].PacketID;
        console.log(`Last Packet ID: ${lastPacketId}`);
        return lastPacketId;
      } else {
        console.log('No packets found in the table.');
        return 0; // or any other default value you prefer
      }
    } catch (error) {
      console.error('Error querying last packet ID:', error);
      throw error;
    }
  }

  export { writeInvalidStreamsToDatabase, writeActivationToDb, writeStreamToDb, writePacketToDb , getLastPacketId};