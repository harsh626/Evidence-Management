pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Roles.sol";

contract EvidenceManagement {
    
    using Roles for Roles.Role;

    Roles.Role private _investigator;
    Roles.Role private _courtRep;
    Roles.Role private _expert;
    Roles.Role private _lawRep;

    struct Evidence {
        string name;
        string description;
        address owner;
        uint timestamp;
        bytes32 hash;
        bool verified;
    }

    mapping (bytes32 => Evidence) private evidenceRegistry;

    function submitEvidence(string memory _name, string memory _description, bytes32 _hash) public {
        require(msg.sender == authorizedUser(), "Unauthorized user");
        require(evidenceRegistry[_hash].owner == address(0), "Evidence already exists");
        Evidence memory newEvidence = Evidence({
            name: _name,
            description: _description,
            owner: msg.sender,
            timestamp: block.timestamp,
            hash: _hash,
            verified: false
        });
        evidenceRegistry[_hash] = newEvidence;
    }

    function verifyEvidence(bytes32 _hash) public {
        require(msg.sender == authorizedUser(), "Unauthorized user");
        require(evidenceRegistry[_hash].owner != address(0), "Evidence does not exist");
        evidenceRegistry[_hash].verified = true;
    }

    function getEvidence(bytes32 _hash) public view returns (string memory, string memory, address, uint, bytes32, bool) {
        Evidence memory evidence = evidenceRegistry[_hash];
        require(evidence.owner != address(0), "Evidence does not exist");
        return (evidence.name, evidence.description, evidence.owner, evidence.timestamp, evidence.hash, evidence.verified);
    }

    function deleteEvidence(bytes32 _hash) public {
        require(msg.sender == authorizedUser(), "Unauthorized user");
        require(evidenceRegistry[_hash].owner != address(0), "Evidence does not exist");
        delete evidenceRegistry[_hash];
    }

    function authorizedUser() internal view returns (address) {
        return owner();
    }

}