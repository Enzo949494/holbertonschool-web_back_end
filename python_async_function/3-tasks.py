#!/usr/bin/env python3
"""
Module for creating asyncio tasks
"""

import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """
    Creates and returns an asyncio.Task for wait_random.

    Args:
        max_delay (int): Maximum delay in seconds

    Returns:
        asyncio.Task: A task that will execute wait_random with max_delay
    """
    return asyncio.create_task(wait_random(max_delay))
