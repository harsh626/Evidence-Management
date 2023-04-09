// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract EvidenceManagement is AccessControl {
    
    /// Data Structures
    bytes32 public constant INVESTIGATOR_ROLE = keccak256("INVESTIGATOR_ROLE");
    bytes32 public constant EXPERT_ROLE = keccak256("EXPERT_ROLE");
    bytes32 public constant COURT_ROLE = keccak256("COURT_ROLE");
    bytes32 public constant LAWYER_ROLE = keccak256("LAWYER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Evidence {
        string name;
        string description;
        address custodian;
        string custodianRole;
        uint timestamp;
        bytes32 hash;
        bool verified;
    }

    constructor() {
        _setupRole(INVESTIGATOR_ROLE, msg.sender);
        _setupRole(EXPERT_ROLE, msg.sender);
        _setupRole(COURT_ROLE, msg.sender);
        _setupRole(LAWYER_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    mapping (uint => Evidence) public evidenceRegistry;

    /// Modifiers

    modifier onlyInvestigatorAndExpert() {
        require((hasRole(INVESTIGATOR_ROLE, msg.sender) || hasRole(EXPERT_ROLE, msg.sender)), "Not your role");
        _;
    }

    modifier onlyLawyerAndCourt() {
        require((hasRole(LAWYER_ROLE, msg.sender) || hasRole(COURT_ROLE, msg.sender)), "Not your role");
        _;
    }

    modifier onlyOne() {
        require((hasRole(LAWYER_ROLE, msg.sender) || hasRole(COURT_ROLE, msg.sender) || hasRole(INVESTIGATOR_ROLE, msg.sender) || hasRole(EXPERT_ROLE, msg.sender)), "You should belong to atleast one organization");
        _;
    }


    /// Events
    event EvidenceAdded(uint id, address trigger, string Role, bytes32 hash, uint timestamp);
    event EvidenceVerified(uint id, address trigger, string Role, uint timestamp);
    event EvidenceDeleted(uint id, address trigger, uint timestamp);
    event EvidenceTransferred(uint id, address trigger, address previousCustodian, string previousCustodianRole ,address currentCustodian, string currentCustodianRole, uint timestamp);

    //// Functions

    function assignInvestigatorRole(address addr) public onlyRole(INVESTIGATOR_ROLE) {
        grantRole(INVESTIGATOR_ROLE, addr);
    }

    function assignExpertRole(address addr) public onlyRole(EXPERT_ROLE) {
        grantRole(EXPERT_ROLE, addr);
    }

    function assignCourtRole(address addr) public onlyRole(COURT_ROLE) {
        grantRole(COURT_ROLE, addr);
    }

    function assignLawyerRole(address addr) public onlyRole(LAWYER_ROLE) {
        grantRole(LAWYER_ROLE, addr);
    }


    function submitEvidence(uint id, string memory _name, string memory _description, bytes32 _hash) public onlyInvestigatorAndExpert {
        require(evidenceRegistry[id].custodian == address(0), "Error: Evidence does not exists");
        string memory _custodianRole;
        if (hasRole(INVESTIGATOR_ROLE, msg.sender)) {
            _custodianRole = "Investigator";
        } else if (hasRole(EXPERT_ROLE, msg.sender)) {
            _custodianRole = "Expert";
        }

        Evidence memory newEvidence = Evidence({
            name: _name,
            description: _description,
            custodian: msg.sender,
            custodianRole: _custodianRole,
            timestamp: block.timestamp,
            hash: _hash,
            verified: false
        });
        evidenceRegistry[id] = newEvidence;
        emit EvidenceAdded(id, msg.sender, _custodianRole, _hash, block.timestamp);
    }

    function transferEvidence(uint id, address _custodian, string memory _custodianRole) public onlyOne {
        require(evidenceRegistry[id].custodian == address(0), "Error: Evidence does not exists");
        Evidence memory evidence;
        address _previousCustodian;
        string memory _previousCustodianRole;

        evidence = evidenceRegistry[id];
        _previousCustodian = evidence.custodian;
        _previousCustodianRole = evidence.custodianRole;
        evidence.custodian = _custodian;
        evidence.custodianRole = _custodianRole;
        emit EvidenceTransferred(id, msg.sender, _previousCustodian, _previousCustodianRole, _custodian, _custodianRole, block.timestamp);
    }

    function verifyEvidence(uint id) public onlyLawyerAndCourt {
        require(evidenceRegistry[id].custodian != address(0), "Error: Please check the evidence ID submitted");
        evidenceRegistry[id].verified = true;
        string memory _verifierRole;

        if (hasRole(LAWYER_ROLE, msg.sender)) {
            _verifierRole = "Lawyer";
        } else if (hasRole(COURT_ROLE, msg.sender)) {
            _verifierRole = "Court";
        }
        emit EvidenceVerified(id, msg.sender, _verifierRole, block.timestamp);
    }

    function getEvidence(uint id) public view onlyOne returns (string memory, string memory, address, string memory, uint, bytes32, bool) {
        Evidence memory evidence = evidenceRegistry[id];
        require(evidence.custodian != address(0), "Error: Please check the evidence ID submitted");
        return (evidence.name, evidence.description, evidence.custodian, evidence.custodianRole, evidence.timestamp, evidence.hash, evidence.verified);
    }

    function deleteEvidence(uint id) public onlyRole(COURT_ROLE) {
        require(evidenceRegistry[id].custodian != address(0), "Error: Please check the evidence ID submitted");
        emit EvidenceDeleted(id, msg.sender, block.timestamp);
        delete evidenceRegistry[id];
    }
}