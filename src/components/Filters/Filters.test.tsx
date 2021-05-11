import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

import Filters from './Filters';
import { mockTestFields, mockTestState } from './mocks/options';

const onApplyFnMock = jest.fn();
const onCloseFnMock = jest.fn();

describe('Filters', () => {
  it('should display remove button when value exists', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.change(screen.getByPlaceholderText('String'), {
      target: { value: 'a' },
    });

    expect(screen.getByTestId('remove-button')).toBeInTheDocument();
  });
  it('should call onApply when value exists and clicked on Apply button', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.change(screen.getByPlaceholderText('String'), {
      target: { value: 'a' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Apply/i }));

    expect(onApplyFnMock).toBeCalled();
  });

  it('should add filter when clicked on Add button', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    expect(screen.queryAllByText('Option A')).toHaveLength(2);
    expect(screen.queryAllByText('is')).toHaveLength(2);
    expect(screen.queryAllByPlaceholderText('String')).toHaveLength(2);
  });

  it('should set default filter when clicked on Clear all button', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    fireEvent.click(screen.getByRole('button', { name: /Clear all/i }));

    expect(screen.queryByText('Option A')).toBeInTheDocument();
    expect(screen.queryByText('is')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('String')).toBeInTheDocument();
  });

  it('should call onClose when clicked on Close button', () => {
    render(
      <Filters
        fields={mockTestFields}
        onApply={onApplyFnMock}
        onClose={onCloseFnMock}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    expect(onCloseFnMock).toBeCalled();
  });

  it('should remain only filter with value when clicked on Apply button', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    fireEvent.change(screen.queryAllByPlaceholderText('String')[0], {
      target: { value: 'a' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Apply/i }));

    expect(screen.queryByText('Option A')).toBeInTheDocument();
    expect(screen.queryByText('is')).toBeInTheDocument();
    expect(screen.getByDisplayValue('a')).toBeInTheDocument();
  });

  it('should display message when new filter is added to applied filters', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.change(screen.getByPlaceholderText('String'), {
      target: { value: 'a' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Apply/i }));
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    expect(
      screen.queryByText('You have unapplied filters'),
    ).toBeInTheDocument();
  });

  it('should display message when applied filter is changed', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    fireEvent.change(screen.queryAllByPlaceholderText('String')[0], {
      target: { value: 'a' },
    });
    fireEvent.change(screen.queryAllByPlaceholderText('String')[1], {
      target: { value: 'b' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Apply/i }));
    fireEvent.change(screen.queryAllByPlaceholderText('String')[0], {
      target: { value: 'c' },
    });

    expect(
      screen.queryByText('You have unapplied filters'),
    ).toBeInTheDocument();
  });

  it('should remove filter when clicked on Remove button', () => {
    render(<Filters fields={mockTestFields} onApply={onApplyFnMock} />);

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    fireEvent.click(screen.queryAllByTestId('remove-button')[0]);

    expect(screen.queryByText('Option A')).toBeInTheDocument();
    expect(screen.queryByText('is')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('String')).toBeInTheDocument();
  });

  it('should select default condition and component when field changed', async () => {
    const { getByText } = render(
      <Filters fields={mockTestFields} onApply={onApplyFnMock} />,
    );

    await selectEvent.select(getByText('Option A'), 'Option B');

    expect(screen.queryByText('is not')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Number')).toBeInTheDocument();
  });

  it("should select first condition and component when field changed and hasn't set default", async () => {
    const { getByText } = render(
      <Filters fields={mockTestFields} onApply={onApplyFnMock} />,
    );

    await selectEvent.select(getByText('Option A'), 'Option C');

    expect(screen.queryByText('contains')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('String')).toBeInTheDocument();
  });

  it('should persist value when condition changed and components are the same', async () => {
    const { getByText } = render(
      <Filters fields={mockTestFields} onApply={onApplyFnMock} />,
    );

    fireEvent.change(screen.getByPlaceholderText('String'), {
      target: { value: 'a' },
    });

    await selectEvent.select(getByText('is'), 'is not');

    expect(screen.getByDisplayValue('a')).toBeInTheDocument();
  });

  it('should keep same operators when operator select changed', async () => {
    const { getByText } = render(
      <Filters fields={mockTestFields} onApply={onApplyFnMock} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    await selectEvent.select(getByText('And'), 'Or');

    expect(screen.queryAllByText(/Or/i)).toHaveLength(2);
  });

  it('should preselect filters when state was applied', () => {
    render(
      <Filters
        fields={mockTestFields}
        state={mockTestState}
        onApply={onApplyFnMock}
      />,
    );

    expect(screen.queryByText('Option B')).toBeInTheDocument();
    expect(screen.queryByText('is')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();

    expect(screen.queryByText('Option C')).toBeInTheDocument();
    expect(screen.queryByText('contains')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Value Option C')).toBeInTheDocument();
  });
});
