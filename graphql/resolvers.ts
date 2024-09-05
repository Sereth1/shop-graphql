import pool from "@/lib/db";
import { FieldPacket, RowDataPacket, OkPacket } from 'mysql2';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
}

export interface Order {
    id: number;
    productId: number;
    quantity: number;
    createdAt: Date;
}

export const resolvers = {
    Query: {
        products: async () => {
            const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM Product');
            return rows as Product[];
        },

        product: async (_: null | string | null | object, args: { id: string }) => {
            const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM Product WHERE id = ?', [args.id]);
            return (rows as Product[])[0];
        },

        orders: async () => {
            const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM `Order`');
            return rows as Order[];
        },

        order: async (_: null | string | object | number, args: { id: string }) => {
            const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM `Order` WHERE id = ?', [args.id]);
            return rows as Order[];
        },
    },

    Mutation: {
        createProduct: async (
            _: null | number | string,
            args: { name: string; description: string; price: number }
        ): Promise<Product> => {
            const [result]: [OkPacket, FieldPacket[]] = await pool.query(
                'INSERT INTO Product (name, description, price) VALUES (?, ?, ?)',
                [args.name, args.description, args.price]
            );

            const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query(
                'SELECT * FROM Product WHERE id = ?',
                [result.insertId]
            );

            return rows[0] as Product;
        },

        createOrder: async (
            _: null | string | number,
            args: { productId: string; quantity: number }
        ): Promise<Order> => {
            const [result]: [OkPacket, FieldPacket[]] = await pool.query(
                'INSERT INTO `Order` (productId, quantity) VALUES (?, ?)',
                [args.productId, args.quantity]
            );

            const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query(
                'SELECT * FROM `Order` WHERE id = ?',
                [result.insertId]
            );

            return rows[0] as Order;
        },
    },
};
