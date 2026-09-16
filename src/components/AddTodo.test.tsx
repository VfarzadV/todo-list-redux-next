import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

describe('AddTodo Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        mockDispatch.mockClear();
    });

    it('should render the input and submit button', () => {
        render(<AddTodo />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should dispatch action when form is submitted with valid text', () => {
        render(<AddTodo />);
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');
        fireEvent.change(input, { target: { value: 'تست رابط کاربری' } });
        fireEvent.click(button);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue('');
    });

    it('should not dispatch action if input is empty', () => {
        render(<AddTodo />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockDispatch).not.toHaveBeenCalled();
    });
});