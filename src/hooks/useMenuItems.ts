import { useMemo } from 'react';
import { useAppSelector } from './useAppSelector';
import { getMenuItemsForRole, MenuItem } from '../utils/menuItems';
import { UserAccessLevel } from '../redux/gt/gt.slice';

/**
 * Hook to get menu items based on the current user's role
 * @returns Array of MenuItem objects filtered by user role
 */
export const useMenuItems = (): MenuItem[] => {
  const { userInfo } = useAppSelector((state) => state.gt);
  
  const menuItems = useMemo(() => {
    // Default to USER role if no user info available
    const userRole = userInfo?.userAccessLevel || UserAccessLevel.USER;
    return getMenuItemsForRole(userRole);
  }, [userInfo?.userAccessLevel]);

  return menuItems;
};

/**
 * Hook to check if current user has access to a specific menu item
 * @param itemName Name of the menu item to check
 * @returns boolean indicating if user has access
 */
export const useHasMenuAccess = (itemName: string): boolean => {
  const menuItems = useMenuItems();
  
  return useMemo(() => {
    return menuItems.some(item => item.name === itemName && !item.disable);
  }, [menuItems, itemName]);
};