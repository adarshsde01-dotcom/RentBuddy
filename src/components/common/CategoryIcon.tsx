import React from 'react';
import {
  Sparkles,
  Shirt,
  Footprints,
  Luggage,
  Dumbbell,
  Smartphone,
  Camera,
  Armchair,
  UtensilsCrossed,
  BookOpen,
  PartyPopper,
  Baby,
  Music,
  Wrench,
  Tent,
  Briefcase,
  Car,
  Palette,
  HeartPulse,
  Truck,
  Dog,
  Layers,
  PackageOpen,
  Package,
  Gamepad2,
  Watch,
  Glasses
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Footprints':
      return <Footprints className={className} />;
    case 'Dumbbell':
      return <Dumbbell className={className} />;
    case 'Luggage':
      return <Luggage className={className} />;
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className={className} />;
    case 'Glasses':
      return <Glasses className={className} />;
    case 'Watch':
      return <Watch className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'PartyPopper':
      return <PartyPopper className={className} />;
    case 'Baby':
      return <Baby className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Tent':
      return <Tent className={className} />;
    case 'Package':
      return <Package className={className} />;
    case 'Armchair':
      return <Armchair className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Truck':
      return <Truck className={className} />;
    case 'Dog':
      return <Dog className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    default:
      return <PackageOpen className={className} />;
  }
};
