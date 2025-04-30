#!/usr/bin/env python3
"""
Module that inserts a new document in a collection
"""


def insert_school(mongo_collection, **kwargs):
    """
    Inserts a new document in a collection based on kwargs
    
    Args:
        mongo_collection: pymongo collection object
        **kwargs: key-value pairs to insert as a document
        
    Returns:
        The new _id of the inserted document
    """
    # Insert the document with the provided kwargs
    result = mongo_collection.insert_one(kwargs)
    
    # Return the _id of the inserted document
    return result.inserted_id
