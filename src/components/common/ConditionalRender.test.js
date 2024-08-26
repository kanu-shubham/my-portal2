import React from 'react';
import { render, screen } from '@testing-library/react';
import ConditionalRender from './ConditionalRender';

describe('ConditionalRender', () => {
  test('renders children when "when" prop is true', () => {
    render(
      <ConditionalRender when={true}>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('renders children when "when" prop is truthy (non-zero number)', () => {
    render(
      <ConditionalRender when={1}>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('renders children when "when" prop is truthy (non-empty string)', () => {
    render(
      <ConditionalRender when="true">
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('does not render children when "when" prop is false', () => {
    render(
      <ConditionalRender when={false}>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.queryByText('Child content')).not.toBeInTheDocument();
  });

  test('does not render children when "when" prop is falsy (0)', () => {
    render(
      <ConditionalRender when={0}>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.queryByText('Child content')).not.toBeInTheDocument();
  });

  test('does not render children when "when" prop is falsy (empty string)', () => {
    render(
      <ConditionalRender when="">
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.queryByText('Child content')).not.toBeInTheDocument();
  });

  test('renders children when "when" prop is undefined', () => {
    render(
      <ConditionalRender>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('renders fallback when "when" prop is false', () => {
    render(
      <ConditionalRender when={false} fallback={<div>Fallback content</div>}>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.getByText('Fallback content')).toBeInTheDocument();
    expect(screen.queryByText('Child content')).not.toBeInTheDocument();
  });

  test('renders nothing when "when" prop is false and no fallback is provided', () => {
    const { container } = render(
      <ConditionalRender when={false}>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders children when both "when" and fallback props are provided and "when" is true', () => {
    render(
      <ConditionalRender when={true} fallback={<div>Fallback content</div>}>
        <div>Child content</div>
      </ConditionalRender>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
    expect(screen.queryByText('Fallback content')).not.toBeInTheDocument();
  });
});