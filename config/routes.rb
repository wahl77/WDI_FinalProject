RailsProject::Application.routes.draw do
  post "images/new" => 'images#new', :as => "new_image"
  post "image/update" => 'images#update', :as => "update_image"

  match "oauth/callback" => "oauths#callback"
  match "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

  root :to => 'static_pages#index'

  match 'static_pages/about' => "static_pages#about", :as => 'static_pages_about'

  resources :sessions, only:[:new, :create, :destroy]
  resources :users

  match 'login' => 'sessions#new', :as => :login
  match 'logout' => 'sessions#destroy', :as => :logout


  get "profile/:id" => 'users#show', :as => "profile"

  get "follow/:id" => 'users#add_follower', :as => "follow"

  post '/search' => 'images#search', as: :search

  get '/choose_location/:id' => 'static_pages#index', :as => "choose_location"

  post '/save_location' => 'images#save_location'

  match 'static_pages/find_images' => 'static_pages#find_images', as: :static_pages_find_images
end
