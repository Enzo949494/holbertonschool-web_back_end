#!/usr/bin/env python3
"""
Module that finds schools by topic
"""


def schools_by_topic(mongo_collection, topic):
    """
    Returns the list of schools having a specific topic
    
    Args:
        mongo_collection: pymongo collection object
        topic: string representing the topic searched
        
    Returns:
        List of school documents that contain the specified topic
    """
    # Create a query to find schools that have the specified topic in their topics array
    query = {"topics": topic}
    
    # Find and return all documents matching the query
    schools = list(mongo_collection.find(query))
    
    return schools