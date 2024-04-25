import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import ErrorPage from './error-page.jsx'
import Contact, { loader as contactLoader } from './routes/contact.jsx'
import EditContact, {
  action as editAction,
} from './routes/edit.jsx';
import {action as destroyContact} from './routes/destroy.jsx'
import Index from './routes/index.jsx'
import { action as contactAction } from './routes/contact.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          {index: true, element: <Index/>},
          {
            path: "contacts/:contactId",
            element: <Contact/>,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact></EditContact>,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyContact,
            errorElement: <div>Oops! There was an error!</div>
          }
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
