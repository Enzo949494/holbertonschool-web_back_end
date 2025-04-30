#!/usr/bin/env python3
"""
Module that lists all documents in a collection
"""


def list_all(mongo_collection):
    """
    Lists all documents in a collection

    Args:
        mongo_collection: pymongo collection object

    Returns:
        List of documents or empty list if no document
    """
    if mongo_collection is None:
        return []

    # Retrieve all documents from the collection
    documents = list(mongo_collection.find())

    # Return the list of documents or empty list if no documents
    return documents
