import { Heart } from 'lucide-react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cn } from '@/lib/utils/cn';
import { addFavorite, removeFavorite } from '@/state/listings/listingsSlice';

import { Button } from './ui';

const ListingFavoriteButton = ({ className, listing }) => {
  const favoriteListingIds = useSelector(
    (state) => state.listings.favoriteListingIds,
  );

  const dispatch = useDispatch();

  const isFavorite = useMemo(
    () => favoriteListingIds.includes(listing.id),
    [listing, favoriteListingIds],
  );

  return (
    <Button
      className={className}
      variant='outline'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          dispatch(removeFavorite(listing.id));
        } else {
          dispatch(addFavorite(listing.id));
        }
      }}
    >
      <Heart
        className={cn('h-4 w-4', { 'fill-primary text-primary': isFavorite })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
