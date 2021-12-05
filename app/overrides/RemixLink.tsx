import React from "react";
import { LinkProps, useHref, useLinkClickHandler } from "react-router-dom";

import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

/**
 * Styled alternative to the link which is importable from remix.
 * Behavior is exactly the same. Lifted from
 * https://github.com/remix-run/react-router/blob/d02f13cff0b0a5470be994d7b79c26635bb62e5a/packages/react-router-dom/index.tsx#L209-L243*/
const RemixLink = React.forwardRef<HTMLAnchorElement, LinkProps & MuiLinkProps>(
  function LinkWithRef(
    { onClick, reloadDocument, replace = false, state, target, to, ...rest },
    ref
  ) {
    const href = useHref(to);
    const internalOnClick = useLinkClickHandler(to, { replace, state, target });
    function handleClick(
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented && !reloadDocument) {
        internalOnClick(event);
      }
    }

    return (
      <MuiLink
        {...rest}
        href={href}
        onClick={handleClick}
        ref={ref}
        target={target}
      />
    );
  }
);

export default RemixLink;
