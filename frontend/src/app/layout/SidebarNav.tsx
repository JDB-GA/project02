import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSidebarNavigation } from "@/app/navigation/useSidebarNavigation";

export function SidebarNav() {
  const { t } = useTranslation();
  const items = useSidebarNavigation();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("nav.menu")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                tooltip={t(`areas.${item.id}.title`)}
              >
                <NavLink
                  to={item.path}
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                >
                  <item.icon />
                  <span>{t(`areas.${item.id}.title`)}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
