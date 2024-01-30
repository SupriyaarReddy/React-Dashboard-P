import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg'
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customfunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='ButtomCenter'>
    <button type='button'
      onClick={customfunc}
      style={{ color}}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray'
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu,
    isClicked, setIsClicked,
    handleClicked,
    screenSize,
    setScreenSize ,currentColor} = useStateContext();

  
// screenSize
  useEffect(() => {
    const handleResize = () => setScreenSize
      (window.innerWidth);
    window.addEventListener('resize', handleResize)
    handleResize();

    return () => window.removeEventListener('resize', handleResize)
  }, []);

  // to track

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className='flex justify-between p2 md:mx6 relative'>

      <NavButton title='Menu' customfunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon={<AiOutlineMenu />} />
      <div className='flex'> <NavButton title='Cart' customfunc={() => handleClicked('cart')} color={currentColor} icon={<FiShoppingCart />} />

        <NavButton title='Chart' dotColor='#03C9D7' customfunc={() => handleClicked('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title='Notification' dotColor='#03C9D7' customfunc={() => handleClicked('notification')} color={currentColor} icon={<RiNotification3Line />} />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClicked('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}  
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>

        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.Notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar
