# Boilerplate React with Redux

Welcome to the Boilerplate React with Redux repository! This project serves as a solid foundation for building scalable and maintainable React applications with Redux state management. It includes essential configurations, common components, hooks, models, pages, routes, services, and utilities for rapid development.

## Features

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Vite**: A blazing fast frontend build tool with React support.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.

## Project Structure

```plaintext
├── public
│   ├── index.html
│   └── app.config.json
├── src
│   ├── api
│   ├── assets
│   │   └── images
│   ├── components
│   │   ├── common
│   │   │   ├── Button.tsx
│   │   │   ├── CheckBox.tsx
│   │   │   ├── Controls.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Table.tsx
│   │   ├── dialogs
│   │   ├── Header.tsx
│   │   ├── Layouts.tsx
│   │   ├── Loader.tsx
│   │   ├── Notification.tsx
│   │   ├── OtpInput.tsx
│   │   ├── SidebarItem.tsx
│   │   └── Uploader.tsx
│   ├── constants
│   ├── hoc
│   ├── hooks
│   ├── models
│   │   ├── api
│   │   │   ├── AdminProfileResponse.ts
│   │   │   ├── ChangePasswordResponse.ts
│   │   │   ├── ForgotResponse.ts
│   │   │   ├── LoginResponse.ts
│   │   │   ├── OtpResponse.ts
│   │   │   ├── ResetPasswordResponse.ts
│   │   │   └── UsersListResponse.ts
│   │   ├── data
│   │   │   ├── auth
│   │   │   │   ├── EmployeeModel.ts
│   │   │   │   └── UserListModel.ts
│   │   │   └── Generals
│   │   │       ├── ButtonType.ts
│   │   │       ├── CommonResponse.ts
│   │   │       ├── DatePicker.ts
│   │   │       ├── ErrorType.ts
│   │   │       ├── ProtectedRouteModel.ts
│   │   │       ├── SidebarData.ts
│   │   │       └── User.ts
│   │   ├── hooks
│   │   │   ├── useGeolocation.ts
│   │   │   ├── useNetwork.ts
│   │   │   └── useNotification.ts
│   │   └── utils
│   │       ├── Helpers.ts
│   │       ├── LocalStorage.ts
│   │       ├── SidebarItems.tsx
│   │       └── Validations.ts
│   ├── pages
│   │   ├── auth
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   └── VerifyEmail.tsx
│   │   └── errors
│   │       └── PageNotFound.tsx
│   │   └── user
│   │       ├── EmpForm.tsx
│   │       ├── Profile.tsx
│   │       └── Users.tsx
│   ├── routes
│   │   ├── ProtectedRoute.tsx
│   │   └── Routing.tsx
│   ├── services
│   │   ├── authService.ts
│   │   └── userService.ts
│   └── utils
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── app.config.json
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Components

- The `components` folder contains reusable UI components such as buttons, checkboxes, inputs, dialogs, headers, loaders, notifications, and more.

## Constants

- Constants such as endpoint URLs, image paths, and initial values are defined in the `constants` folder.

## Hooks

- Custom hooks for common functionalities like geolocation, network status, and notifications are implemented in the `hooks` folder.

## Models

- Data models for API responses, authentication, user profiles, and general entities are defined in the `models` folder.

## Pages

- The `pages` folder contains React components representing different pages of the application, organized by functionality.

## Routes

- Routing logic and protected route components are defined in the `routes` folder.

## Services

- Service modules for handling authentication and user-related functionalities are located in the `services` folder.

## Utils

- Utility functions for helper methods, local storage operations, sidebar items, and validations are implemented in the `utils` folder.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/boilerplate-react.git
cd boilerplate-react
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to contact me:

- **GitHub**: [yourusername](https://github.com/yourusername)

---

Thank you for using this boilerplate project! Happy coding!
