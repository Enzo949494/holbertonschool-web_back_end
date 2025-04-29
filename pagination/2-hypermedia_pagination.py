#!/usr/bin/env python3
"""
Hypermedia pagination implementation
"""
import csv
import math
from typing import List, Dict, Any


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


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Return the appropriate page of the dataset.
        
        Args:
            page (int): The page number (1-indexed)
            page_size (int): The number of items per page
            
        Returns:
            List[List]: The requested page of the dataset
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        
        start_idx, end_idx = index_range(page, page_size)
        dataset = self.dataset()
        
        if start_idx >= len(dataset):
            return []
            
        return dataset[start_idx:end_idx]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        Return hypermedia pagination information including the dataset page.
        
        Args:
            page (int): The page number (1-indexed)
            page_size (int): The number of items per page
            
        Returns:
            Dict: Dictionary containing pagination information and data
        """
        data = self.get_page(page, page_size)
        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size) if page_size > 0 else 0
        
        # Calculate next_page and prev_page
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None
        
        return {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }
