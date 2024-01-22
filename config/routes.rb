Rails.application.routes.draw do
  
  resources :bids
  resources :comments
  resources :products
  resources :users, except: [:show, :create]
  get '/search-products/:product_name', to: "products#search_products"
  post '/signup', to: "users#create"
  get '/me', to: "users#show"
  delete '/logout', to: "sessions#destroy"
  post '/login', to: "sessions#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
