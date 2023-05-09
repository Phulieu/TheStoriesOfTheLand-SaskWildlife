import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Specimen } from '../components';

describe('Specimen component', () => {
  test('renders the title and image correctly', () => {
    const title = 'Test title';
    const url = 'https://test-url.com/test-image.jpg';
    const onClick = jest.fn();

    render(<Specimen title={title} url={url} onClick={onClick} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const imageElement = screen.getByAltText('Specimen');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', url);
  });

  test('calls onClick function when image and title are clicked', () => {
    const title = 'Test title';
    const url = 'https://test-url.com/test-image.jpg';
    const onClick = jest.fn();

    render(<Specimen title={title} url={url} onClick={onClick} />);

    const titleElement = screen.getByText(title);
    titleElement.click();

    expect(onClick).toHaveBeenCalledTimes(1);

    const imageElement = screen.getByAltText('Specimen');
    imageElement.click();

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
