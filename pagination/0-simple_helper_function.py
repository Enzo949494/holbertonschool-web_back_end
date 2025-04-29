#!/usr/bin/env python3
"""
Helper function for pagination
"""


def index_range(page, page_size):
    """
    Return a tuple of start and end indexes for pagination.

    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.

    Returns:
        tuple: A tuple containing (start_index, end_index).
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
