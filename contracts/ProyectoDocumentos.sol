// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProyectoDocumentos {
    enum TipoDocumento {
        Otro,
        Acta,
        Contrato,
        Factura,
        Informe,
        Soporte
    }

    enum EstadoDocumento {
        Vigente,
        Anulado,
        Reemplazado
    }

    struct Documento {
        string cid;
        bytes32 hashArchivo;
        uint256 proyectoId;
        TipoDocumento tipoDocumento;
        uint256 version;
        EstadoDocumento estado;
        address autor;
        uint256 timestamp;
    }

    mapping(address => Documento[]) private documentosPorAutor;
    mapping(uint256 => Documento[]) private documentosPorProyecto;

    event DocumentoGuardado(
        address indexed autor,
        uint256 indexed proyectoId,
        string cid,
        bytes32 hashArchivo,
        TipoDocumento tipoDocumento,
        uint256 version,
        uint256 timestamp
    );

    event EstadoActualizado(
        uint256 indexed proyectoId,
        uint256 indice,
        EstadoDocumento nuevoEstado
    );

    function guardarDocumento(
        string calldata _cid,
        bytes32 _hashArchivo,
        uint256 _proyectoId,
        TipoDocumento _tipoDocumento,
        uint256 _version
    ) external {
        Documento memory doc = Documento({
            cid: _cid,
            hashArchivo: _hashArchivo,
            proyectoId: _proyectoId,
            tipoDocumento: _tipoDocumento,
            version: _version,
            estado: EstadoDocumento.Vigente,
            autor: msg.sender,
            timestamp: block.timestamp
        });

        documentosPorAutor[msg.sender].push(doc);
        documentosPorProyecto[_proyectoId].push(doc);

        emit DocumentoGuardado(
            msg.sender,
            _proyectoId,
            _cid,
            _hashArchivo,
            _tipoDocumento,
            _version,
            block.timestamp
        );
    }

    function obtenerMisDocumentos() external view returns (Documento[] memory) {
        return documentosPorAutor[msg.sender];
    }

    function obtenerDocumentosPorProyecto(uint256 _proyectoId)
        external
        view
        returns (Documento[] memory)
    {
        return documentosPorProyecto[_proyectoId];
    }

    function actualizarEstado(
        uint256 _proyectoId,
        uint256 _indice,
        EstadoDocumento _nuevoEstado
    ) external {
        Documento storage doc = documentosPorProyecto[_proyectoId][_indice];
        require(doc.autor == msg.sender, "Solo el autor puede actualizar");
        doc.estado = _nuevoEstado;
        emit EstadoActualizado(_proyectoId, _indice, _nuevoEstado);
    }
}
