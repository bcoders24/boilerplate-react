import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import cn from '@/utils/cn';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { Separator } from '@/components/ui/separator';
import { SIDEBAR_ITEMS } from '@/constants/sidebar-options';
import './../shared.scss';

const Sidebar = (): JSX.Element => {
  const { expanded, toggleExpanded } = useSidebarStore();
  return (
    <aside className={cn('bg-gray12 min-h-screen duration-500 text-primary-foreground', expanded ? 'w-72' : 'w-16')}>
      {/* <img src="" className={cn('w-20', expanded ? 'w-20' : 'w-0')} alt="iwe-tyres-logo" /> */}
      <div className="py-3 flex justify-end pr-4">
        <Menu size={26} className="cursor-pointer" onClick={() => toggleExpanded()} />
      </div>
      <div className="mt-4 flex flex-col relative">
        {SIDEBAR_ITEMS?.map((menu, index) => (
          <Fragment key={index}>
            <NavLink
              to={menu?.path}
              className={({ isActive }) =>
                cn('group flex items-center text-sm gap-3.5 font-medium py-2 px-6', {
                  'bg-primary active': isActive,
                  'hover:bg-gray-800': !isActive,
                })
              }
            >
              <img
                src={`/images/sidebar-inactive/${menu.title}.svg`}
                className="inactive block w-4 flex-shrink-0 group-hover:hidden"
                alt={menu.title}
              />
              <img
                src={`/images/sidebar-active/${menu.title}.svg`}
                className="active hidden w-4 flex-shrink-0 group-hover:block"
                alt={menu.title}
              />
              <h2
                style={{ transitionDelay: `${index + 1}00ms` }}
                className={cn(
                  'text-[11px] whitespace-pre duration-500 text-gray-400 group-hover:hidden',
                  !expanded && 'opacity-0 translate-x-28 overflow-hidden',
                )}
              >
                {menu?.title}
              </h2>
              <h2
                style={{ transitionDelay: `${index + 1}00ms` }}
                className={cn(
                  'hidden text-[11px] whitespace-pre duration-500 text-white group-hover:block',
                  !expanded && 'opacity-0 translate-x-28 overflow-hidden',
                )}
              >
                {menu?.title}
              </h2>

              {/* For collapsed state */}
              <h2
                className={cn(
                  'text-[11px] absolute left-48 bg-white font-semibold whitespace-pre text-gray12 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-20 group-hover:duration-300 group-hover:w-fit',
                  expanded && 'hidden',
                  !expanded && 'collapsed',
                )}
              >
                {menu?.title}
              </h2>
            </NavLink>
            {menu.extras && <Separator className="my-2 h-[0.5px] bg-gray-500" />}
          </Fragment>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
