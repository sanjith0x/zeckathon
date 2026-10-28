import React from 'react';
import type { IconProps } from './types';

export const MicIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="8.5" y="2.5" width="7" height="12" rx="3.5" />
    <path d="M4.5 10.5C4.5 14.5 7.8 18 12 18C16.2 18 19.5 14.5 19.5 10.5" />
    <line x1="12" y1="18" x2="12" y2="21.5" />
    <line x1="8" y1="21.5" x2="16" y2="21.5" />
  </svg>
);

export const SpeakerIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="10 4 5 8 2 8 2 16 5 16 10 20 10 4" />
    <path d="M15.5 8.5C16.8 9.8 17.5 11.5 17.5 13.5C17.5 15.5 16.8 17.2 15.5 18.5" />
    <path d="M18.8 5.2C20.8 7.3 22 10.2 22 13.5C22 16.8 20.8 19.7 18.8 21.8" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21.5 2.5L10 14" />
    <path d="M21.5 2.5L14.5 21.5L10 14L2.5 9.5L21.5 2.5Z" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const AlertIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="0.75" fill="currentColor" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const SlidersIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="4" y1="6" x2="12" y2="6" />
    <line x1="16" y1="6" x2="20" y2="6" />
    <circle cx="14" cy="6" r="2" />
    <line x1="4" y1="12" x2="8" y2="12" />
    <line x1="12" y1="12" x2="20" y2="12" />
    <circle cx="10" cy="12" r="2" />
    <line x1="4" y1="18" x2="16" y2="18" />
    <line x1="20" y1="18" x2="20" y2="18" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

export const CompassIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9.5" />
    <polygon points="15.8 8.2 13.5 13.5 8.2 15.8 10.5 10.5 15.8 8.2" fill="currentColor" fillOpacity="0.15" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2.5C12 7.7 7.7 12 2.5 12C7.7 12 12 16.3 12 21.5C12 16.3 16.3 12 21.5 12C16.3 12 12 7.7 12 2.5Z" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2.5L4 6V11.5C4 16.8 7.4 21.4 12 22.5C16.6 21.4 20 16.8 20 11.5V6L12 2.5Z" />
    <path d="M12 7.5V17" strokeDasharray="2 2" />
  </svg>
);

export const TrendUpIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export const WalletIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2.5" y="5" width="19" height="15" rx="3" />
    <path d="M2.5 9.5H21.5" />
    <path d="M16 14H18.5" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const PieIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21.2 12C20.6 17.1 16.5 21 11.5 21C6.2 21 2 16.8 2 11.5C2 6.5 5.9 2.4 11 1.8V12H21.2Z" />
    <path d="M14.5 2.2C18.4 3.2 21.3 6.6 22 10.5H14.5V2.2Z" fill="currentColor" fillOpacity="0.12" />
  </svg>
);

export const RepeatIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M17 2L21 6L17 10" />
    <path d="M3 11V9C3 7.3 4.3 6 6 6H21" />
    <path d="M7 22L3 18L7 14" />
    <path d="M21 13V15C21 16.7 19.7 18 18 18H3" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6V19.5C19 20.3 18.3 21 17.5 21H6.5C5.7 21 5 20.3 5 19.5V6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 1.5, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9.5" />
    <line x1="12" y1="11" x2="12" y2="16.5" />
    <circle cx="12" cy="7.5" r="0.75" fill="currentColor" />
  </svg>
);
