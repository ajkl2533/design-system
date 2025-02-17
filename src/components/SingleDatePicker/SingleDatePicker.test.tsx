import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import SingleDatePicker from './SingleDatePicker';

describe('SingleDatePicker', () => {
  it('should date picker popping up when user clicks on the input ', () => {
    const handleChangeDate = jest.fn();

    renderWithProviders(
      <SingleDatePicker
        maxDate={new Date('2021/03/28')}
        minDate={new Date('2021/03/01')}
        value={null}
        onChange={handleChangeDate}
      />,
    );

    userEvent.click(screen.getByPlaceholderText('Enter date…'));

    expect(screen.getByText(/March 2021/i)).toBeInTheDocument();
  });

  it('should call onchange when a date is picked', () => {
    const handleChangeDate = jest.fn();

    renderWithProviders(
      <SingleDatePicker
        maxDate={new Date('2021/03/28')}
        minDate={new Date('2021/03/01')}
        value={null}
        onChange={handleChangeDate}
      />,
    );
    const input = screen.getByPlaceholderText('Enter date…');

    // Opens date picker
    userEvent.click(input);

    // Click on a date
    fireEvent.click(screen.getByLabelText('Choose Friday, March 12th, 2021'));

    expect(handleChangeDate).toHaveBeenCalled();
  });

  it('should determine selected date by input value', () => {
    const handleChangeDate = jest.fn();

    renderWithProviders(
      <SingleDatePicker
        maxDate={new Date('2021/03/28')}
        minDate={new Date('2021/03/01')}
        value={new Date('2021/03/12')}
        onChange={handleChangeDate}
      />,
    );

    expect(screen.getByDisplayValue('12 Mar, 2021')).toBeInTheDocument();
  });

  it('should change the default placeholder', () => {
    const handleChangeDate = jest.fn();

    renderWithProviders(
      <SingleDatePicker
        value={null}
        placeholder="Custom placeholder"
        onChange={handleChangeDate}
      />,
    );

    expect(
      screen.getByPlaceholderText('Custom placeholder'),
    ).toBeInTheDocument();
  });
});
