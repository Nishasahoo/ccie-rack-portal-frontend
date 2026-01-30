import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const isDesktop = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Navbar() {
  const navRef = useRef(null);
  const navigate = useNavigate();

const menu = useMemo(
  () => ({
    Cisco: {
      "Technology Lab": [{ label: "CCNA", to: "/cisco/ccna" }],

      CCIE: [
        {
          label: "EI",
          children: [
            { label: "Equipment", to: "/placeholder" },
            { label: "EI v1.1 Topology", to: "/placeholder" },

            // FIXED
            { label: "Scheduler", to: "/ei-scheduler" },

            { label: "Rack Access Guide", to: "/placeholder" },
            { label: "Buy Now", to: "/placeholder" },
          ],
        },
        {
          label: "Security",
          children: [
            { label: "Equipment", to: "/placeholder" },
            { label: "SEC v6.1 Topology", to: "/placeholder" },

            // FIXED
            { label: "Scheduler", to: "/security-scheduler" },

            { label: "Rack Access Guide", to: "/placeholder" },
            { label: "Buy Now", to: "/placeholder" },
          ],
        },
        {
          label: "Data Center",
          children: [
            { label: "Equipment", to: "/placeholder" },
            { label: "Topology", to: "/placeholder" },

            // FIXED
            { label: "Scheduler", to: "/datacenter-scheduler" },

            { label: "Rack Access Guide", to: "/placeholder" },
            { label: "Buy Now", to: "/placeholder" },
          ],
        },
        {
          label: "Wireless",
          children: [
            { label: "Equipment", to: "/placeholder" },
            { label: "Topology", to: "/placeholder" },

            // FIXED
            { label: "Scheduler", to: "/wireless-scheduler" },

            { label: "Rack Access Guide", to: "/placeholder" },
            { label: "Buy Now", to: "/placeholder" },
          ],
        },
      ],
    },

    Fortinet: {
      FCX: [
        {
          label: "NSE8 / FCX",
          children: [
            { label: "Equipment", to: "/placeholder" },
            { label: "Topology", to: "/placeholder" },

            // FIXED
            { label: "Scheduler", to: "/fcx-scheduler" },

            { label: "Rack Access Guide", to: "/placeholder" },
            { label: "Buy Now", to: "/placeholder" },
          ],
        },
      ],
    },
  }),
  []
);

  // Desktop mega states
  const [openTop, setOpenTop] = useState(null);
  const [col2, setCol2] = useState(null);
  const [col3, setCol3] = useState(null);

  // Mobile drawer + accordion states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mTop, setMTop] = useState(null);
  const [mLevel2, setMLevel2] = useState(null);
  const [mLevel3, setMLevel3] = useState(null); // track item with children

  const closeAll = () => {
    setOpenTop(null);
    setCol2(null);
    setCol3(null);

    setDrawerOpen(false);
    setMTop(null);
    setMLevel2(null);
    setMLevel3(null);
  };

  const go = (to) => {
    closeAll();
    navigate(to);
  };

  // Close on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) closeAll();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const topItems = ["Cisco", "Fortinet"];

  // Desktop hover open
  const openMega = (name) => {
    if (!isDesktop()) return;
    setOpenTop(name);
    const first = Object.keys(menu[name] ?? {})[0] || null;
    setCol2(first);
    setCol3(null);
  };

  const col2Items = openTop ? Object.keys(menu[openTop] ?? {}) : [];
  const col2List = openTop && col2 ? menu[openTop]?.[col2] ?? [] : [];
  const col3List = col3?.children ?? [];

  return (
    <header
      className="siteHeader"
      ref={navRef}
      onMouseLeave={() => isDesktop() && setOpenTop(null)}
    >
      <div className="navInner">
        <Link to="/" className="brand" onClick={closeAll}>
          <div className="brandLogo">CCIE</div>
          <div className="brandText">
            <div className="brandTitle">CCIE Rack Rentals</div>
            <div className="brandSub">Service Provider Scheduler</div>
          </div>
        </Link>

        {/* Mobile button */}
        <button
          className="hamburger"
          aria-label="Open menu"
          type="button"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>

        {/* Desktop nav */}
        <nav className="navLinks desktopOnly">
          {topItems.map((name) => (
            <button
              key={name}
              type="button"
              className={`topLink ${openTop === name ? "active" : ""}`}
              onMouseEnter={() => openMega(name)}
              onClick={() => openMega(name)}
            >
              {name} <span className="chev">▾</span>
            </button>
          ))}

          <NavLink to="/about" className="topNavLink">
            About
          </NavLink>
          <NavLink to="/contact" className="topNavLink">
            Contact
          </NavLink>
{/* 
          <NavLink to="/login" className="loginBtn">
            Login
          </NavLink> */}
        </nav>
      </div>

      {/* Desktop mega */}
      {isDesktop() && openTop && menu[openTop] && (
        <div className="megaWrap">
          <div className="mega">
            <div className="megaCol">
              <div className="megaTitle">{openTop}</div>
              {col2Items.map((k) => (
                <button
                  key={k}
                  className={`megaItem ${col2 === k ? "selected" : ""}`}
                  onMouseEnter={() => {
                    setCol2(k);
                    setCol3(null);
                  }}
                  onClick={() => {
                    setCol2(k);
                    setCol3(null);
                  }}
                  type="button"
                >
                  {k}
                  <span className="right">›</span>
                </button>
              ))}
            </div>

            <div className="megaCol">
              <div className="megaTitle">Tracks</div>
              {col2List.map((item) => (
                <button
                  key={item.label}
                  className={`megaItem ${
                    col3?.label === item.label ? "selected" : ""
                  }`}
                  onMouseEnter={() => setCol3(item.children ? item : null)}
                  onClick={() => (item.to ? go(item.to) : setCol3(item))}
                  type="button"
                >
                  {item.label}
                  <span className="right">{item.children ? "›" : ""}</span>
                </button>
              ))}
            </div>

            <div className="megaCol">
              <div className="megaTitle">Resources</div>
              {col3List.length === 0 ? (
                <div className="megaHint">Select a track to view resources.</div>
              ) : (
                col3List.map((x) => (
                  <button
                    key={x.label}
                    className="megaItem"
                    onClick={() => go(x.to)}
                    type="button"
                  >
                    {x.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ MOBILE DRAWER (FIXED: SHOW LEVEL-3 RESOURCES) */}
      {drawerOpen && (
        <>
          <div className="drawerBackdrop" onClick={closeAll} />
          <aside className="drawer" role="dialog" aria-modal="true">
            <div className="drawerHeader">
              <div className="drawerTitle">Menu</div>
              <button className="drawerClose" onClick={closeAll} type="button">
                ✕
              </button>
            </div>

            <div className="drawerBody">
              {topItems.map((top) => (
                <div key={top} className="accSection">
                  <button
                    type="button"
                    className={`accTop ${mTop === top ? "open" : ""}`}
                    onClick={() => {
                      setMTop((p) => (p === top ? null : top));
                      setMLevel2(null);
                      setMLevel3(null);
                    }}
                  >
                    <span>{top}</span>
                    <span className="accIcon">{mTop === top ? "–" : "+"}</span>
                  </button>

                  {mTop === top && (
                    <div className="accPanel">
                      {Object.keys(menu[top] ?? {}).map((k) => (
                        <div key={k} className="accRow">
                          <button
                            type="button"
                            className={`accL2 ${mLevel2 === k ? "open" : ""}`}
                            onClick={() => {
                              setMLevel2((p) => (p === k ? null : k));
                              setMLevel3(null); // reset resources
                            }}
                          >
                            <span>› {k}</span>
                            <span className="accIconSmall">
                              {mLevel2 === k ? "–" : "+"}
                            </span>
                          </button>

                          {mLevel2 === k && (
                            <div className="accPanelInner">
                              {(menu[top]?.[k] ?? []).map((item) => (
                                <div key={item.label}>
                                  {/* Track title */}
                                  <button
                                    type="button"
                                    className="accLeaf"
                                    onClick={() => {
                                      // if the item is directly clickable
                                      if (item.to) return go(item.to);

                                      // otherwise open its resources
                                      if (item.children) {
                                        setMLevel3((p) =>
                                          p?.label === item.label ? null : item
                                        );
                                      }
                                    }}
                                  >
                                    {item.label}
                                    {item.children ? (
                                      <span style={{ marginLeft: "8px" }}>›</span>
                                    ) : null}
                                  </button>

                                  {/* Level-3 resources */}
                                  {mLevel3?.label === item.label &&
                                    (item.children ?? []).length > 0 && (
                                      <div className="accPanelInner" style={{ paddingLeft: 14 }}>
                                        {(item.children ?? []).map((res) => (
                                          <button
                                            key={res.label}
                                            type="button"
                                            className="accLeaf"
                                            onClick={() => go(res.to)}
                                          >
                                            {res.label}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="drawerLinks">
                <button className="drawerLink" onClick={() => go("/about")}>
                  About Us
                </button>
                <button className="drawerLink" onClick={() => go("/contact")}>
                  Contact Us
                </button>
                <button className="drawerLink primary" onClick={() => go("/login")}>
                  Login
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}
