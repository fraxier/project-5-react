Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  ### Custom Routes
  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  ### Model Routes
  # user:
  # get user details, create new user, udpate user details, login/logout user
  # subject:
  # get user subjects, create new user subject, udpate user subject, delete user subject
  # topic:
  # get subject topics, create new subject topic, delete subject topic
  # notes:
  # get topic notes, create new topic note, udpate topic note, delete topic note
  resources :user, only: %i[show create update] do
    resources :subject, only: %i[show create update destroy] do
      resources :topic, only: %i[show create delete] do
        resources :note, only: %i[show create update delete]
      end
    end
  end
end
