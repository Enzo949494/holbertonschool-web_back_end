#!/usr/bin/env python3
"""
Module that changes school topics
"""


def update_topics(mongo_collection, name, topics):
    """
    Changes all topics of a school document based on the name
    
    Args:
        mongo_collection: pymongo collection object
        name: school name to update
        topics: list of topics approached in the school
    """
    # Create the filter to find schools by name
    query = {"name": name}
    
    # Define the update operation - set the topics field
    update = {"$set": {"topics": topics}}
    
    # Update all matching documents
    mongo_collection.update_many(query, update)
