"""Database-independent open-search candidate discovery."""

from eti.discovery.extractor import (
    CandidateGroup,
    DiscoveryDocument,
    DiscoveryResult,
    discover_candidates,
)

__all__ = [
    "CandidateGroup",
    "DiscoveryDocument",
    "DiscoveryResult",
    "discover_candidates",
]