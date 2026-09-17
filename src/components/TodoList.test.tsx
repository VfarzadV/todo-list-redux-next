import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '@/redux/todoSlice';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('TodoList Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    it('should render a list of todos', async () => {
        const mockState = {
            todos: {
                items: [
                    { id: '1', text: 'خرید نان', completed: false },
                    { id: '2', text: 'ورزش', completed: true },
                ],
                filter: 'all',
            }
        };
        (useSelector as unknown as jest.Mock).mockImplementation((callback) => callback(mockState));
        render(<TodoList />);
        const firstTodo = await screen.findByText('خرید نان');
        const secondTodo = await screen.findByText('ورزش');
        expect(firstTodo).toBeInTheDocument();
        expect(secondTodo).toBeInTheDocument();
    });

    it('should dispatch toggleTodo when checkbox is clicked', async () => {
        const mockState = {
            todos: {
                items: [{ id: '1', text: 'خرید نان', completed: false }],
                filter: 'all',
            }
        };
        (useSelector as unknown as jest.Mock).mockImplementation((callback) => callback(mockState));
        render(<TodoList />);
        const checkbox = await screen.findByRole('checkbox');
        fireEvent.click(checkbox);
        expect(mockDispatch).toHaveBeenCalledWith(toggleTodo('1'));
    });

    it('should dispatch deleteTodo when delete button is clicked', async () => {
        const mockState = {
            todos: {
                items: [{ id: '1', text: 'خرید نان', completed: false }],
                filter: 'all',
            }
        };
        (useSelector as unknown as jest.Mock).mockImplementation((callback) => callback(mockState));
        render(<TodoList />);
        const deleteBtn = await screen.findByTitle('حذف کردن');
        fireEvent.click(deleteBtn);
        expect(mockDispatch).toHaveBeenCalledWith(deleteTodo('1'));
    });
});