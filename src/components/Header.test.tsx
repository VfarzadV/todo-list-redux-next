import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

describe('Header Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    });

    it('should render the login button when user is logged out', async () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            isLoggedIn: false,
            username: null,
        });
        render(<Header />);
        expect(await screen.findByRole('button')).toBeInTheDocument();
    });

    it('should render the username and logout button when logged in', async () => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            isLoggedIn: true,
            username: 'Farzad',
        });
        render(<Header />);
        expect(await screen.findByText(/Farzad/i)).toBeInTheDocument();
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
    });
});