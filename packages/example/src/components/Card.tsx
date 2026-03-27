import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  footer,
}) => {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
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
