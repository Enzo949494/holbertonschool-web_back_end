#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict, Any, Optional


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: truncated_dataset[i] for i in range(len(truncated_dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: Optional[int] = None, page_size: int = 10) -> Dict:
        """
        Return a page of the dataset based on index,
        that is resilient to deletions.

        Args:
            index (int): The starting index of the requested page
            page_size (int): The number of items per page

        Returns:
            Dict: Dictionary containing pagination information and data
        """
        # If no index provided, start from 0
        if index is None:
            index = 0

        # Get the indexed dataset
        indexed_data = self.indexed_dataset()
        
        # Verify index is in valid range
        assert index >= 0 and index < len(indexed_data), "Index out of range"
        
        # Find the real index if the one provided doesn't exist anymore
        real_start_idx = index
        while real_start_idx not in indexed_data and real_start_idx < len(indexed_data):
            real_start_idx += 1
        
        # Collect data for the current page
        data: List[List] = []
        current_idx = real_start_idx
        while len(data) < page_size and current_idx < len(indexed_data):
            if current_idx in indexed_data:
                data.append(indexed_data[current_idx])
            current_idx += 1
        
        # Calculate next_index
        next_index = current_idx
        
        return {
            'index': index,  # Return original index, not real_start_idx
            'next_index': next_index,
            'page_size': page_size,
            'data': data
        }
