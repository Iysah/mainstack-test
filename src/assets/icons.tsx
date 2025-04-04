import * as React from "react"

    export function MainStackLogo(props: any) {
    return (
      <svg
        width={36}
        height={36}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M29.084 12.55h-4.783a.864.864 0 01-.864-.863V6.96a.864.864 0 01.864-.864h1.877a3.77 3.77 0 013.77 3.77v1.82a.864.864 0 01-.864.864zM6.063 26.152v-10.55a.864.864 0 01.864-.865h4.756a.864.864 0 01.864.864v13.457a.864.864 0 01-.864.864h-1.85a3.77 3.77 0 01-3.77-3.77zM14.748 26.152v-10.55a.864.864 0 01.864-.865h4.757a.864.864 0 01.864.864v13.457a.864.864 0 01-.864.864h-1.85a3.77 3.77 0 01-3.771-3.77zM23.434 26.152v-10.55a.864.864 0 01.864-.865h4.756a.864.864 0 01.864.864v13.457a.864.864 0 01-.864.864h-1.85a3.77 3.77 0 01-3.77-3.77zM17.542 6.088l-10.624-.01a.864.864 0 00-.864.863l-.002 1.897a3.693 3.693 0 003.69 3.696l10.623.01a.865.865 0 00.866-.863V9.785a3.692 3.692 0 00-3.69-3.697z"
          fill="#131316"
        />
      </svg>
    )
    }

    export function HomeIcon(props: any) {
        return (
          <svg
            width={24}
            height={24}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={20}
              height={20}
            >
              <path fill="#D9D9D9" d="M0 0H20V20H0z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M4.721 16.112h3.22v-4.51c0-.168.056-.309.17-.422a.574.574 0 01.422-.17h2.949c.157 0 .293.057.407.17.113.113.17.254.17.422v4.51h3.22V8.308a.241.241 0 00-.028-.116.313.313 0 00-.076-.092l-5.023-3.772A.246.246 0 0010 4.28a.246.246 0 00-.152.048L4.825 8.1a.312.312 0 00-.076.092.241.241 0 00-.028.116v7.804zm-.913 0V8.316c0-.192.038-.368.115-.528.078-.161.196-.296.356-.407L9.3 3.595c.205-.158.437-.236.697-.236.26 0 .493.078.7.236l5.023 3.786c.16.11.278.246.355.407.078.16.116.336.116.528v7.796c0 .248-.09.463-.27.643a.878.878 0 01-.643.27h-3.541a.574.574 0 01-.423-.169.573.573 0 01-.17-.423v-4.51h-2.29v4.51c0 .17-.058.31-.171.423a.555.555 0 01-.406.17H4.715a.871.871 0 01-.636-.271.877.877 0 01-.271-.643z"
                fill="#56616B"
              />
            </g>
          </svg>
        )
    }

    export function RevenueIcon(props: any) {
        return (
          <svg
            width={24}
            height={24}
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={24}
              height={24}
            >
              <path fill="#D9D9D9" d="M0 0H24V24H0z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M3.775 19.126c-.47 0-.871-.167-1.205-.502a1.643 1.643 0 01-.502-1.205V8.435c0-.19.069-.354.206-.492a.673.673 0 01.494-.205c.193 0 .357.068.494.205a.672.672 0 01.205.492v8.984c0 .077.032.148.097.212a.294.294 0 00.211.096h14.52a.67.67 0 01.49.206.67.67 0 01.206.491c0 .194-.068.36-.206.497a.671.671 0 01-.49.205H3.774zm3.46-3.44c-.47 0-.871-.167-1.206-.5a1.643 1.643 0 01-.501-1.206V6.504c0-.47.167-.871.501-1.206a1.643 1.643 0 011.206-.5h12.99c.47 0 .871.166 1.205.5.335.335.502.737.502 1.206v7.476c0 .47-.167.87-.502 1.205a1.643 1.643 0 01-1.205.502H7.235zm1.44-1.399c0-.49-.172-.907-.514-1.25a1.678 1.678 0 00-1.234-.517v1.46c0 .083.03.155.091.216s.133.091.217.091h1.44zm10.11 0h1.44c.083 0 .155-.03.216-.09a.296.296 0 00.092-.217v-1.46c-.486 0-.899.173-1.238.517-.34.345-.51.762-.51 1.25zm-5.059-1.697c.66 0 1.216-.228 1.667-.684.45-.457.675-1.015.675-1.675 0-.652-.227-1.205-.68-1.658a2.263 2.263 0 00-1.663-.68 2.29 2.29 0 00-1.668.675c-.457.45-.686 1.006-.686 1.67 0 .66.227 1.216.682 1.67.454.455 1.012.682 1.673.682zm-6.8-4.627c.487 0 .9-.172 1.239-.517.34-.344.51-.761.51-1.25h-1.44a.296.296 0 00-.217.091.296.296 0 00-.091.217v1.46zm13.607 0v-1.46a.296.296 0 00-.092-.216.296.296 0 00-.216-.09h-1.44c0 .49.172.907.514 1.25.342.344.753.516 1.234.516z"
                fill="#fff"
              />
            </g>
          </svg>
        )
    }

    export function AnalyticsIcon(props: any) {
        return (
          <svg
            width={24}
            height={24}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={20}
              height={20}
            >
              <path fill="#D9D9D9" d="M0 0H20V20H0z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M6.696 13.973a.434.434 0 00.323-.133.454.454 0 00.13-.331v-4.38a.43.43 0 00-.134-.316.437.437 0 00-.32-.134.44.44 0 00-.33.134.438.438 0 00-.13.316v4.38c0 .132.045.243.134.331.09.088.198.133.327.133zm3.311 0a.434.434 0 00.323-.133.454.454 0 00.13-.331V6.477a.43.43 0 00-.135-.316.437.437 0 00-.318-.134.44.44 0 00-.33.134.438.438 0 00-.13.316v7.032c0 .132.044.243.133.331.09.088.198.133.327.133zm3.305 0a.434.434 0 00.323-.133.455.455 0 00.13-.331v-1.787a.435.435 0 00-.135-.312.431.431 0 00-.319-.138.434.434 0 00-.33.138.442.442 0 00-.13.312v1.787c0 .132.045.243.134.331a.446.446 0 00.327.133zm-9.17 3.053c-.313 0-.586-.117-.819-.349a1.121 1.121 0 01-.348-.82V4.143c0-.314.116-.587.348-.82.233-.231.506-.348.82-.348h11.715c.314 0 .587.117.82.349.232.232.348.505.348.82v11.715c0 .314-.116.587-.349.819a1.121 1.121 0 01-.82.349H4.144zm.002-.914h11.712a.245.245 0 00.176-.08.245.245 0 00.08-.176V4.144a.245.245 0 00-.08-.176.245.245 0 00-.176-.08H4.144a.245.245 0 00-.176.08.245.245 0 00-.08.176v11.712c0 .064.027.123.08.176.054.053.112.08.176.08z"
                fill="#56616B"
              />
            </g>
          </svg>
        )
    }

    export function MenuIcon(props: any) {
        return (
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={24}
              height={24}
            >
              <path fill="#D9D9D9" d="M0 0H24V24H0z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M4 17.275c-.15 0-.27-.05-.362-.15a.5.5 0 01-.138-.35c0-.15.046-.27.138-.362A.487.487 0 014 16.275h16a.49.49 0 01.363.138.49.49 0 01.137.362c0 .133-.046.25-.137.35a.47.47 0 01-.363.15H4zM4 12.5c-.15 0-.27-.05-.362-.15A.5.5 0 013.5 12a.49.49 0 01.138-.363A.49.49 0 014 11.5h16c.15 0 .271.05.363.15.091.1.137.217.137.35 0 .15-.046.271-.137.363A.493.493 0 0120 12.5H4zm0-4.775a.487.487 0 01-.362-.138.487.487 0 01-.138-.362.5.5 0 01.138-.35c.091-.1.212-.15.362-.15h16c.15 0 .271.05.363.15.091.1.137.217.137.35a.49.49 0 01-.137.362.49.49 0 01-.363.138H4z"
                fill="#56616B"
              />
            </g>
          </svg>
        )
    }

    export function AppIcon(props: any) {
        return (
          <svg
            width={24}
            height={24}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={20}
              height={20}
            >
              <path fill="#D9D9D9" d="M0 0H20V20H0z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M13.253 9.487l-3.061-3.061a.688.688 0 01-.213-.528.69.69 0 01.213-.526l3.06-3.061a.688.688 0 01.53-.214.691.691 0 01.526.213l3.06 3.061a.688.688 0 01.213.529.69.69 0 01-.213.526l-3.06 3.06a.688.688 0 01-.529.214.691.691 0 01-.526-.213zm-10.03-1.62V3.54c0-.214.072-.393.216-.537a.729.729 0 01.537-.216h4.327c.213 0 .392.072.536.216a.729.729 0 01.217.537v4.327a.729.729 0 01-.217.536.729.729 0 01-.537.217H3.977a.729.729 0 01-.537-.217.729.729 0 01-.217-.536zm7.82 7.82V11.36c0-.213.072-.392.216-.536a.729.729 0 01.537-.217h4.327c.213 0 .392.072.537.217a.729.729 0 01.216.536v4.327a.729.729 0 01-.216.537.729.729 0 01-.537.216h-4.327a.73.73 0 01-.537-.216.73.73 0 01-.216-.537zm-7.82 0V11.36c0-.213.072-.392.216-.536a.729.729 0 01.537-.217h4.327c.213 0 .392.072.536.217a.729.729 0 01.217.536v4.327a.729.729 0 01-.217.537.729.729 0 01-.537.216H3.977a.729.729 0 01-.537-.216.729.729 0 01-.217-.537zm1.25-8.317h3.333V4.037H4.472V7.37zm9.328.904l2.354-2.354-2.354-2.355-2.354 2.355L13.8 8.274zm-1.508 6.916h3.333v-3.333h-3.333v3.333zm-7.82 0h3.333v-3.333H4.472v3.333z"
                fill="#56616B"
              />
            </g>
          </svg>
        )
    }

    export function CRMIcon(props: any) {
        return (
          <svg
            width={24}
            height={24}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={20}
              height={20}
            >
              <path fill="#C4C4C4" d="M0 0H20V20H0z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M1.744 14.118c0-.418.107-.789.32-1.111.212-.323.502-.575.868-.757a12.792 12.792 0 012.342-.878c.784-.206 1.643-.31 2.575-.31.933 0 1.79.104 2.57.31.78.207 1.561.5 2.343.878.365.183.654.436.867.758.213.322.319.692.319 1.11v.571c0 .312-.115.588-.345.825-.23.238-.509.357-.837.357h-9.84a1.14 1.14 0 01-.837-.345 1.14 1.14 0 01-.345-.837v-.57zm15.334 1.753h-1.842a2.7 2.7 0 00.217-.568c.052-.198.077-.403.077-.614v-.605c0-.543-.123-1.06-.37-1.553a3.373 3.373 0 00-1.087-1.247c.53.086 1.033.212 1.51.377.477.165.937.364 1.378.596.412.217.732.478.958.783.227.305.34.636.34.995v.652c0 .33-.115.61-.346.84-.232.23-.51.344-.835.344zM7.849 9.76c-.78 0-1.445-.275-1.993-.823a2.715 2.715 0 01-.822-1.993c0-.781.274-1.446.822-1.994a2.715 2.715 0 011.993-.822c.781 0 1.446.274 1.994.822.548.548.822 1.213.822 1.994 0 .78-.274 1.445-.822 1.993a2.715 2.715 0 01-1.994.822zm6.893-2.825c0 .774-.274 1.437-.822 1.988a2.708 2.708 0 01-1.994.826c-.078 0-.183-.01-.313-.029-.13-.019-.236-.04-.32-.063.324-.38.573-.801.746-1.265.173-.464.259-.949.259-1.454s-.089-.988-.267-1.45a4.641 4.641 0 00-.739-1.274 1.22 1.22 0 01.32-.072c.108-.01.213-.014.314-.014.781 0 1.446.275 1.994.825.548.55.822 1.21.822 1.982zM2.91 14.706h9.872v-.586a.857.857 0 00-.13-.47 1.104 1.104 0 00-.421-.362 9.827 9.827 0 00-2.09-.792 9.373 9.373 0 00-2.29-.268 9.43 9.43 0 00-2.297.268 9.8 9.8 0 00-2.092.792 1.078 1.078 0 00-.423.362.866.866 0 00-.129.47v.585zm4.938-6.111c.455 0 .844-.161 1.167-.484.323-.322.484-.71.484-1.165 0-.455-.16-.844-.483-1.167a1.586 1.586 0 00-1.165-.484c-.455 0-.844.16-1.167.483-.323.322-.485.71-.485 1.165 0 .455.162.844.484 1.167.322.323.71.485 1.165.485z"
                fill="#56616B"
              />
            </g>
          </svg>
        )
    }

    export function ChatIcon(props: any) {
        return (
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <rect width={40} height={40} rx={20} fill="#fff" />
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={10}
              y={10}
              width={20}
              height={20}
            >
              <path fill="#D9D9D9" d="M10 10H30V30H10z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M15.833 21.458h5c.178 0 .326-.06.446-.18.12-.119.18-.267.18-.445a.605.605 0 00-.18-.445.605.605 0 00-.446-.18h-5a.605.605 0 00-.445.18.605.605 0 00-.18.445c0 .178.06.326.18.446s.268.18.445.18zm0-2.5h8.334c.177 0 .325-.06.445-.18.12-.119.18-.267.18-.445a.605.605 0 00-.18-.445.605.605 0 00-.445-.18h-8.334a.605.605 0 00-.445.18.605.605 0 00-.18.445c0 .178.06.326.18.446s.268.18.445.18zm0-2.5h8.334c.177 0 .325-.06.445-.18.12-.119.18-.267.18-.445a.605.605 0 00-.18-.445.605.605 0 00-.445-.18h-8.334a.605.605 0 00-.445.18.605.605 0 00-.18.445c0 .178.06.326.18.446s.268.18.445.18zm-.801 8.125l-1.668 1.669c-.238.237-.51.29-.818.16-.309-.13-.463-.363-.463-.7V13.59c0-.421.146-.777.438-1.07a1.454 1.454 0 011.069-.437h12.82c.421 0 .777.146 1.069.438.292.291.438.648.438 1.069v9.487c0 .42-.146.777-.438 1.069a1.454 1.454 0 01-1.069.437H15.032zm-.532-1.25h11.91a.245.245 0 00.176-.08.245.245 0 00.08-.176V13.59a.245.245 0 00-.08-.177.245.245 0 00-.176-.08H13.59a.245.245 0 00-.177.08.245.245 0 00-.08.177v10.897l1.167-1.154z"
                fill="#56616B"
              />
            </g>
          </svg>
        )
    }

    export function BellIcon(props: any) {
        return (
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <rect width={40} height={40} rx={20} fill="#fff" />
            <mask
              id="a"
              style={{
                maskType: "alpha"
              }}
              maskUnits="userSpaceOnUse"
              x={10}
              y={10}
              width={20}
              height={20}
            >
              <path fill="#C4C4C4" d="M10 10H30V30H10z" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M14.375 25.737a.605.605 0 01-.445-.18.605.605 0 01-.18-.445c0-.177.06-.326.18-.445.12-.12.268-.18.445-.18h.881V18.27c0-1.12.346-2.111 1.038-2.973a4.598 4.598 0 012.664-1.652v-.519c0-.29.102-.535.304-.738.202-.202.448-.304.737-.304.29 0 .535.102.738.304.203.203.305.449.305.738v.52a4.599 4.599 0 012.664 1.651 4.612 4.612 0 011.038 2.973v6.218h.881c.177 0 .326.06.445.18.12.12.18.268.18.445 0 .178-.06.326-.18.446a.605.605 0 01-.445.18h-11.25zm5.624 2.34c-.415 0-.77-.148-1.064-.443a1.452 1.452 0 01-.441-1.064h3.012c0 .416-.147.771-.442 1.065-.296.295-.65.442-1.065.442zm-3.493-3.59h6.988V18.27c0-.965-.341-1.788-1.024-2.47A3.366 3.366 0 0020 14.776c-.965 0-1.788.34-2.47 1.023a3.366 3.366 0 00-1.024 2.47v6.218z"
                fill="#56616B"
              />
            </g>
          </svg>
        )
      }