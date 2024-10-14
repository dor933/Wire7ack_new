"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInvalidStreamsToDatabase = writeInvalidStreamsToDatabase;
exports.writeActivationToDb = writeActivationToDb;
exports.writeStreamToDb = writeStreamToDb;
exports.writePacketToDb = writePacketToDb;
exports.getLastPacketId = getLastPacketId;
const mssql = __importStar(require("mssql"));
async function writeInvalidStreamsToDatabase(streams, dbConnection) {
    const transaction = await dbConnection.transaction();
    try {
        await transaction.begin();
        for (const stream of streams) {
            if (!stream.validity) {
                const streamId = await writeStreamToDb(dbConnection, stream);
                for (const packet of stream.Packets) {
                    await writePacketToDb(dbConnection, packet, streamId);
                }
            }
        }
        await transaction.commit();
        return true;
    }
    catch (error) {
        await transaction.rollback();
        console.error('Error writing to database:', error);
        return false;
    }
}
async function writeActivationToDb(connection, activation) {
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
      CASE WHEN CONVERT(VARCHAR(MAX), @protocols) = '' THEN 'All' ELSE @protocols END
    )`;
    try {
        const result = await connection.request()
            .input('StartTime', mssql.DateTime, activation.StartTime)
            .input('IPHOST1', mssql.Text, activation.IPHOST1)
            .input('IPHOST2', mssql.Text, activation.IPHOST2)
            .input('IPHOST3', mssql.Text, activation.IPHOST3)
            .input('IPHOST4', mssql.Text, activation.IPHOST4)
            .input('protocols', mssql.VarChar(40), activation.protocols)
            .query(query);
        activation.ActivationID = result.recordset[0].ActivationID;
        return activation;
    }
    catch (error) {
        console.error('Error writing activation to database:', error);
        throw error;
    }
}
async function writeStreamToDb(connection, stream) {
    console.log('this is the stream', stream);
    // Insert stream into database and return the inserted ID
    const query = `INSERT INTO Stream (connectionID, SourceIP, DestinationIP, ActivationID, Protocol, validity, StartTime, EndTime, Duration, PacketCount, DataVolume, ApplicationProtocol) 
                   OUTPUT INSERTED.ID
                   VALUES (@connectionID, @SourceIP, @DestinationIP, @ActivationID, @Protocol, @validity, @StartTime, @EndTime, @Duration, @PacketCount, @DataVolume, @ApplicationProtocol)`;
    try {
        const result = await connection.request()
            .input('connectionID', mssql.Int, stream.connectionID)
            .input('SourceIP', mssql.VarChar(45), stream.SourceIP)
            .input('DestinationIP', mssql.VarChar(45), stream.DestinationIP)
            .input('ActivationID', mssql.Int, stream.ActivationID)
            .input('Protocol', mssql.VarChar(20), stream.Protocol ? stream.Protocol : '')
            .input('validity', mssql.Bit, stream.validity)
            .input('StartTime', mssql.DateTime, stream.StartTime)
            .input('EndTime', mssql.DateTime, stream.EndTime ? stream.EndTime : null)
            .input('Duration', mssql.Float, stream.Duration ? stream.Duration : null)
            .input('PacketCount', mssql.Int, stream.PacketCount ? stream.PacketCount : null)
            .input('DataVolume', mssql.BigInt, stream.DataVolume ? stream.DataVolume : null)
            .input('ApplicationProtocol', mssql.VarChar(50), stream.ApplicationProtocol ? stream.ApplicationProtocol : null)
            .query(query);
        return result.recordset[0].ID;
    }
    catch (error) {
        console.error('Error writing stream to database:', error);
        throw error;
    }
}
async function writePacketToDb(connection, packet, streamId) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const query = `
      INSERT INTO Packets (
        StreamID, SourceIP, DestinationIP, Protocol, Payload, Timestamp, Size, 
        ActivationID, SourceMAC, DestinationMAC, SourcePort, DestinationPort, Flags, 
        FrameLength, ConnectionID, InterfaceAndProtocol, TCPFlagSYN, TCPFlagACK, 
        TCPFlagFIN, TCPFlagRST, TCPFlagPSH, TCPFlagURG, TCPFlagECE, TCPFlagCWR, 
        TCPFlagNS, TCPSeq, TCPAck, TCPChecksumStatus, UDPChecksumStatus, ARPOpcode, 
        IPChecksumStatus, ErrorIndicator, ICMPType, ICMPCode, ICMPChecksumStatus
      ) 
      VALUES (
       @StreamID, @SourceIP, @DestinationIP, @Protocol, @Payload, @Timestamp, @Size, 
        @ActivationID, @SourceMAC, @DestinationMAC, @SourcePort, @DestinationPort, @Flags, 
        @FrameLength, @ConnectionID, @InterfaceAndProtocol, @TCPFlagSYN, @TCPFlagACK, 
        @TCPFlagFIN, @TCPFlagRST, @TCPFlagPSH, @TCPFlagURG, @TCPFlagECE, @TCPFlagCWR, 
        @TCPFlagNS, @TCPSeq, @TCPAck, @TCPChecksumStatus, @UDPChecksumStatus, @ARPOpcode, 
        @IPChecksumStatus, @ErrorIndicator, @ICMPType, @ICMPCode, @ICMPChecksumStatus
      )`;
    await connection.request()
        .input('StreamID', mssql.Int, streamId)
        .input('SourceIP', mssql.VarChar(45), packet.SourceIP)
        .input('DestinationIP', mssql.VarChar(45), packet.DestinationIP)
        .input('Protocol', mssql.VarChar(10), packet.Protocol ? packet.Protocol : "")
        .input('Payload', mssql.Text, packet.Payload ? packet.Payload : "")
        .input('Timestamp', mssql.DateTime, packet.Timestamp ? packet.Timestamp : null)
        .input('Size', mssql.Int, packet.Size ? packet.Size : null)
        .input('ActivationID', mssql.Int, packet.ActivationID ? packet.ActivationID : null)
        .input('SourceMAC', mssql.VarChar(17), packet.sourceMAC ? packet.sourceMAC : "")
        .input('DestinationMAC', mssql.VarChar(17), packet.destinationMAC ? packet.destinationMAC : "")
        .input('SourcePort', mssql.Int, packet.sourcePort ? packet.sourcePort : null)
        .input('DestinationPort', mssql.Int, packet.DestPort ? packet.DestPort : null)
        .input('Flags', mssql.VarChar(20), packet.flags ? packet.flags : "")
        .input('FrameLength', mssql.Int, packet.frameLength ? packet.frameLength : null)
        .input('ConnectionID', mssql.Int, packet.connectionID)
        .input('InterfaceAndProtocol', mssql.VarChar(50), packet.Interface_and_protocol ? packet.Interface_and_protocol : "")
        .input('TCPFlagSYN', mssql.Bit, ((_a = packet.tcpFlags) === null || _a === void 0 ? void 0 : _a.syn) ? 1 : 0)
        .input('TCPFlagACK', mssql.Bit, ((_b = packet.tcpFlags) === null || _b === void 0 ? void 0 : _b.ack) ? 1 : 0)
        .input('TCPFlagFIN', mssql.Bit, ((_c = packet.tcpFlags) === null || _c === void 0 ? void 0 : _c.fin) ? 1 : 0)
        .input('TCPFlagRST', mssql.Bit, ((_d = packet.tcpFlags) === null || _d === void 0 ? void 0 : _d.rst) ? 1 : 0)
        .input('TCPFlagPSH', mssql.Bit, ((_e = packet.tcpFlags) === null || _e === void 0 ? void 0 : _e.psh) ? 1 : 0)
        .input('TCPFlagURG', mssql.Bit, ((_f = packet.tcpFlags) === null || _f === void 0 ? void 0 : _f.urg) ? 1 : 0)
        .input('TCPFlagECE', mssql.Bit, ((_g = packet.tcpFlags) === null || _g === void 0 ? void 0 : _g.ece) ? 1 : 0)
        .input('TCPFlagCWR', mssql.Bit, ((_h = packet.tcpFlags) === null || _h === void 0 ? void 0 : _h.cwr) ? 1 : 0)
        .input('TCPFlagNS', mssql.Bit, ((_j = packet.tcpFlags) === null || _j === void 0 ? void 0 : _j.ns) || false)
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
async function getLastPacketId(connection) {
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
        }
        else {
            console.log('No packets found in the table.');
            return 0; // or any other default value you prefer
        }
    }
    catch (error) {
        console.error('Error querying last packet ID:', error);
        throw error;
    }
}
