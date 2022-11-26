import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
//import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
    alt: '',
  });

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
  });

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isDataSet, setIsDataSet] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: '',
  });
  const history = useHistory();

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setUserData({ email: res.data.email });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
          history.push('/');
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.link ||
    isInfoToolTipOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('click', closeByOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('click', closeByOverlay);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .patchUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoToolTipOpen(false);
  };

  function closeByOverlay(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setUserData({ email: email });
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        history.push('/sign-in');
        setTooltipStatus(true);
        console.log(err);
      });
  };

  const handleRegister = ({ email, password }) => {
    console.log(email, password);
    auth
      .register(email, password)
      .then((res) => {
        if (res.data._id) {
          setIsDataSet(true);
          history.push('/sign-in');
          setTooltipStatus(true);
        }
      })
      .catch((err) => {
        setIsDataSet(false);
        setTooltipStatus(false);
        setIsInfoToolTipOpen(true);
      })
      .finally(() => {
        setIsDataSet(false);
        setIsInfoToolTipOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData({ email: '' });
    setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} handleLogout={handleLogout} email={userData.email} />

        <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/"
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          />

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} isDataSet={isDataSet} />
          </Route>

          <Route path="*">{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          authStatus={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

/*
<Route exact path="/">
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Route>
           <Switch>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/"
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          />
          <ProtectedRoute loggedIn={loggedIn} exact path="/">
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
         dasdasds71622@yandex.ru asdasdqwe232343
*/
