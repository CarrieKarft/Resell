Rails.application.routes.draw do
  
  resources :bids
  resources :comments
  resources :products
  resources :users
  delete '/logout', to: "sessions#destroy"
  post '/login', to: "sessions#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
