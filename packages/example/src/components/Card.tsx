import React from 'react';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  description: React.ReactNode;
}

export const Card = ({ title, children, className = '', footer, description }: CardProps) => {
  console.log('Card props:', { title, children, className, footer });
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
      <header>{description}</header>
      {title && (
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          {children}
        </div>
      )}
      {!title && <div className="card-body">{children}</div>}
      {footer && <div className="card-actions justify-end">{footer}</div>}
    </div>
  );
};

export default Card;
