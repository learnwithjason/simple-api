import type { Handler } from '@netlify/functions';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

const food = [
	{
		id: randomUUID(),
		title: 'Carnitas Burrito',
		restaurant: {
			name: 'Taco Gang',
			link: 'https://tacogangpdx.com',
			location: 'Portland, OR',
		},
		categories: ['lunch', 'dinner', 'heavy', 'mexican'],
		rating: 4.8,
	},
	{
		id: randomUUID(),
		title: 'White Brisket Curry',
		restaurant: {
			name: 'Eem',
			link: 'https://www.eempdx.com/',
			location: 'Portland, OR',
		},
		categories: ['dinner', 'heavy', 'thai', 'bbq'],
		rating: 5.0,
	},
	{
		id: randomUUID(),
		title: 'Jerk Chicken',
		restaurant: {
			name: 'The Real Jerk',
			link: 'https://www.therealjerk.com/',
			location: 'Toronto, ON',
		},
		categories: ['lunch', 'dinner', 'carribean'],
		rating: 4.9,
	},
];

const Filters = z.object({
	location: z.enum(['Portland, OR', 'Toronto, ON']).optional(),
	category: z.string().optional().default(''),
	rating: z.coerce.number().min(0.0).max(5.0).optional().default(0.0),
});

export const handler: Handler = async (event) => {
	const filters = Filters.parse(event.queryStringParameters);

	let filteredFood = food.filter((item) => item.rating >= filters.rating);

	if (filters.location) {
		filteredFood = filteredFood.filter(
			(item) => item.restaurant.location === filters.location,
		);
	}

	if (filters.category) {
		filteredFood = filteredFood.filter((item) =>
			item.categories.includes(filters.category),
		);
	}

	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json; charset=utf8',
		},
		body: JSON.stringify(filteredFood),
	};
};
