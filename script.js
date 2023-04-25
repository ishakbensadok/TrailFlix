// selections

const app = document.getElementById('app');
const loadingSpinner = document.getElementById('ld-spn');

const form = document.getElementById('form');
const inputTextField = document.getElementById('input--text');
const inputNumberField = document.getElementById('input--number');
const small = document.getElementById('small');

const video = document.getElementById('iframe');

const posterImg = document.getElementById('poster__img');
const movieTitleLabel = document.getElementById('movie__title');
const movieContainer = document.getElementById('movie');
const seatBookingContainer = document.getElementById('seat-booking');
const appBackEnd = document.getElementById('appBackEnd');

const creditsLabel = document.getElementById('credits__label');

const typeLabel = document.getElementById('type');
const playingNowLabel = document.getElementById('playing-now');

const releasedDateLabel = document.getElementById('releasedDate');
const releasedStatusLabel = document.getElementById('releasedStatus');

const imdbRatingLabel = document.getElementById('imdb__rating');
const durationTimeLabel = document.getElementById('duration__time');
const GenreLabel = document.getElementById('Genre');
const PlotSummaryLabel = document.getElementById('Plot__summary');
const RottenTomatoes__ratingLabel = document.getElementById(
  'RottenTomatoes__rating'
);
const slideContainer = document.getElementById('slides');

const switchBtn = document.getElementById('credits__switch');
const switchBtn2 = document.getElementById('switch');

const btnLeft = document.querySelector('.screen__btn--left');
const btnRight = document.querySelector('.screen__btn--right');

const bookNowBtn = document.getElementById('bookNow-btn');

const rowsContainer = document.getElementById('rows');
const statusContainer = document.getElementById('status');

const castsContainer = document.getElementById('casts');
const CrewsContainer = document.getElementById('crews');

const creditsContainer = document.getElementById('credits');

const rowsArr = Array.from(document.querySelectorAll('.row'));

const PerformersElArr = Array.from(document.querySelectorAll('.Performers'));

const omdbapiApiKey = 'ba1f4581';
const themoviedbApiKey = '11f65aaa9cdeb254f0857712f52aad8f';
// const imdbApiKey = 'k_vmq4gudy';
const imdbApiKey = 'k_d3f2gbeq';

/* ************************************************************************************************************************************ */
const imagesDotsContainer = document.querySelector('.imagesDots');
const videosDotsContainer = document.querySelector('.videosDots');

const screenImagesBtn = document.getElementById('screen__imagesBtn');
const screenVideosBtn = document.getElementById('screen__videosBtn');

const slidesImagesContainer = document.getElementById('slides__images');
const slidesVideosContainer = document.getElementById('slides__videos');

const screenRemoteEl = document.querySelector('.screen__remote');

/* ************************************************************************************************************************************ */

class App {
  #currSlide = 0;
  #VideoscurrSlide = 0;
  #ImagescurrSlide = 0;
  #images;
  #vidoes;
  #currEl = document.getElementById('slides__videos');
  #slides = Array.from(this.#currEl.querySelectorAll('.slide'));
  // #slides = [];
  #omdbapiApi = 'ba1f4581';
  // #tmdbApi = '11f65aaa9cdeb254f0857712f52aad8f';
  #tmdbApi = '2d4b842bb2345ff8f361b70262842a3d';
  #mediaDetails;
  #packedData;
  #etr = 1;
  constructor() {
    // Attach event handlers
    this._handlingSearchResult();
    this._handlingClickOnSearchResult();

    this._handlingClickOnScreenRemote();
    this._handlingClickOnScreenBtns();

    this._handlingClickOnDots();

    this._handlingClickOnPerformers();
    this._handlingClickOnSwitchBtn();
    this._handlingClickOnSwitchBtn2();
    this._handlingClickOnPanels();
    this._intailCreditsState();
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _handlingClickOnDots() {
    imagesDotsContainer.addEventListener('click', this.dotsEv.bind(this));
    videosDotsContainer.addEventListener('click', this.dotsEv.bind(this));
  }
  /////////////////////////////////////////////////////////////////////////////////////
  dotsEv(e) {
    ////
    if (e.target.classList.contains('dot')) {
      const curr = Number(
        Array.from(e.target.closest('.dots').children)
          .find((dot) => dot.classList.contains('active'))
          .classList[1].replaceAll('dot--', '')
      );
      const next = Number(e.target.classList[1].replaceAll('dot--', '')) - 1;

      if (curr <= next) {
        for (let i = curr; i <= next; i++) {
          this._btnRightEv();
        }
      }
      if (curr >= next) {
        for (let i = curr - 1; i > next; i--) {
          this._btnLeftEv();
        }
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _setSlides() {
    this.#slides = Array.from(this.#currEl.querySelectorAll('.slide'));
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _setCurrentSlide() {
    this.#currSlide = Array.from(document.querySelectorAll('.dots'))
      .find((d) => !d.classList.contains('hidden'))
      .classList.contains('.videosDots')
      ? this.#VideoscurrSlide
      : this.#ImagescurrSlide;
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _handlingClickOnScreenRemote() {
    screenImagesBtn.addEventListener('click', this._switchToImages.bind(this));
    screenVideosBtn.addEventListener('click', this._switchToVideos.bind(this));
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _switchToImages() {
    //TODO
    this.#VideoscurrSlide = this.#currSlide;
    this.#currSlide = this.#ImagescurrSlide;

    //TODO
    screenImagesBtn.classList.add('active');
    screenVideosBtn.classList.remove('active');

    //TODO
    imagesDotsContainer.classList.remove('hidden');
    videosDotsContainer.classList.add('hidden');

    this.#currEl.classList.add('hidden');
    this.#currEl = slidesImagesContainer;

    this._setSlides();

    this.#currEl.classList.remove('hidden');
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _switchToVideos() {
    //TODO
    this.#ImagescurrSlide = this.#currSlide;
    this.#currSlide = this.#VideoscurrSlide;

    //TODO
    screenImagesBtn.classList.remove('active');
    screenVideosBtn.classList.add('active');
    //TODO
    imagesDotsContainer.classList.add('hidden');
    videosDotsContainer.classList.remove('hidden');

    this.#currEl.classList.add('hidden');
    this.#currEl = document.getElementById('slides__videos');

    this._setSlides();

    this.#currEl.classList.remove('hidden');
  }
  /////////////////////////////////////////////////////////////////////////////////////
  /********************** */
  _handlingClickOnScreenBtns() {
    btnRight.addEventListener('click', this._btnRightEv.bind(this));
    btnLeft.addEventListener('click', this._btnLeftEv.bind(this));
  }

  /////////////////////////////////////////////////////////////////////////////////////

  _btnRightEv() {
    this.#slides.forEach((slide, i) => {
      if (this.#currSlide * -1 === this.#slides.length - 1) {
        this._turnBackRight();
      } else
        slide.style.transform = `translateX(${
          (this.#currSlide + i) * 100 - 100
        }%)`;
    });
    this.#currSlide--;

    //TODO: REP
    const el = videosDotsContainer.classList.contains('hidden')
      ? imagesDotsContainer
      : videosDotsContainer;

    Array.from(el.children).forEach((dot) => {
      if (dot.classList.contains(`dot--${this.#currSlide * -1 + 1}`)) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _turnBackRight() {
    this.#slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${
        (this.#currSlide + i) * 100 + (this.#slides.length - 1) * 100
      }%)`;
    });
    this.#currSlide = 1;
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _btnLeftEv() {
    this.#slides.forEach((slide, i) => {
      if (this.#currSlide === 0) {
        this._turnBackLeft();
      } else
        slide.style.transform = `translateX(${
          (this.#currSlide + i) * 100 + 100
        }%)`;
    });
    this.#currSlide++;

    //TODO: REP
    const el = videosDotsContainer.classList.contains('hidden')
      ? imagesDotsContainer
      : videosDotsContainer;

    //TODO
    Array.from(el.children).forEach((dot) => {
      if (dot.classList.contains(`dot--${this.#currSlide * -1 + 1}`)) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////

  _turnBackLeft() {
    this.#slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${
        (this.#currSlide + i) * 100 - (this.#slides.length - 1) * 100
      }%)`;
    });
    this.#currSlide = -this.#slides.length;
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _handlingClickOnPanels() {
    const panels = Array.from(document.querySelectorAll('.panel'));

    panels.forEach((p) =>
      p.addEventListener('click', this._panelsEv.bind(this))
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _panelsEv(e) {
    if (e.target.classList.contains('recommended__info')) {
      const id = e.target.closest('.recommended').dataset.id;
      const type = e.target.closest('.recommended').dataset.type;
      this._getMediaInfo(id, type);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _showSwitchBtn() {
    switchBtn.classList.remove('hidden');
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _hideSwitchBtn() {
    switchBtn.classList.add('hidden');
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _showContent() {
    app.classList.remove('hidden');
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _hideContent() {
    app.classList.add('hidden');
  }

  _showSpinnerLoading() {
    loadingSpinner.classList.remove('hidden');
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _hideSpinnerLoading() {
    loadingSpinner.classList.add('hidden');
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _showCredits() {
    creditsContainer.classList.remove('hidden');
  }

  /////////////////////////////////////////////////////////////////////////////////////

  _hideCredits() {
    creditsContainer.classList.add('hidden');
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _renderError(errMsg) {
    small.textContent = errMsg;
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _handlingClickOnSwitchBtn() {
    switchBtn.addEventListener('click', this._switchBtnEv);
  }

  /////////////////////////////////////////////////////////////////////////////////////

  _handlingClickOnSwitchBtn2() {
    switchBtn2.addEventListener('click', this._switchBtnEv2.bind(this));
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _intailSwitchBtn2State() {
    document.getElementById('rightLabel').textContent = 'Popular';
    this.#etr = 1;
    Array.from(document.querySelector('.rightSide').children)
      .slice(1)
      .forEach((el) => {
        if (el.classList.contains('popular')) {
          el.classList.remove('hidden');
        } else el.classList.add('hidden');
      });
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _switchBtnEv2() {
    const labels = this.#packedData.slice(1).map((d) => d.label);
    let nexLabel = labels[this.#etr];
    this.#etr++;

    if (this.#etr === this.#packedData.length - 1) this.#etr = 0;

    document.getElementById('rightLabel').textContent = nexLabel.replaceAll(
      '-',
      ' '
    );

    Array.from(document.querySelector('.rightSide').children)
      .slice(1)
      .forEach((el) => {
        if (el.classList.contains(`${nexLabel}`)) {
          el.classList.remove('hidden');
        } else el.classList.add('hidden');

        el.scrollTop = 0;
        el.scrollLeft = 0;
      });
  }
  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////

  _switchBtnEv() {
    creditsLabel.textContent === 'Cast'
      ? (creditsLabel.textContent = 'Crew')
      : (creditsLabel.textContent = 'Cast');

    castsContainer.classList.toggle('hidden');
    CrewsContainer.classList.toggle('hidden');
  }
  /////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////
  _handlingClickOnPerformers() {
    //
    PerformersElArr.forEach((perCont) => {
      perCont.addEventListener(
        'mouseover',
        this._PerformersEv.bind({
          opacity0: 1,
          opacity1: 0,
        })
      );
      perCont.addEventListener(
        'mouseout',
        this._PerformersEv.bind({
          opacity0: 0,
          opacity1: 1,
        })
      );
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////

  _PerformersEv(e) {
    const opacities = this;
    if (e.target.classList.contains('member__img')) {
      const Casts = Array.from(e.target.closest('.Performers').children);
      const memberEl = e.target.closest('.member');

      memberEl.querySelector('.member__info-charachter').style.opacity =
        opacities.opacity0;

      ///
      Casts.forEach((cast) => {
        cast.querySelector('.member__info-name').style.opacity =
          opacities.opacity1;
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _handlingSearchResult() {
    form.addEventListener('input', this._searchResult.bind(this));
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _handlingClickOnSearchResult() {
    form.addEventListener('click', this._getMedia.bind(this));
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _init() {
    this._hideContent();
    this._removeSearchResult();
    this._showSpinnerLoading();
    this._intailCreditsState();
    this._hideSearchResult();
    this._intailSwitchBtn2State();

    //Todo
    this.#currEl = slidesVideosContainer;
    slidesVideosContainer.classList.remove('hidden');
    slidesImagesContainer.classList.add('hidden');
    this._setSlides();

    inputTextField.value = '';

    /////////

    this.#currSlide = 0;
    this.#VideoscurrSlide = 0;
    this.#ImagescurrSlide = 0;
  }
  /////////////////////////////////////////////////////////////////////////////////////

  async _getMediaInfo(id, type) {
    this._init();

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${
          this.#tmdbApi
        }&append_to_response=images,videos,credits,recommendations,external_ids`
      );

      const responseData = await response.json();

      if (responseData?.success === false) throw new Error('Not Found');

      // add type property
      responseData.type = type;

      this.#mediaDetails = responseData;

      /* *************************************** */
      const imdbId = responseData.external_ids?.imdb_id;
      // await this._addMoreInfo(imdbId);
      await this._addMoreInfo(imdbId);
      /* *************************************** */

      ////////////
      this._renderMedia(this.#mediaDetails);
      ///////////
      ///////////
      ///////////
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////
  async _getMedia(e) {
    try {
      e.preventDefault();

      if (e.target.closest('.result')) {
        const id = +e.target.closest('.result').dataset.id;
        const type = e.target.closest('.result').dataset.type;

        // await this._getMediaInfo(id, type);
        this._getMediaInfo(id, type);
        //////////////
        //////////////
        //////////////
      }
    } catch (err) {
      const errorMsg = `Oops, Something Went Wrong: ${err.message}`;
      this._renderError(errorMsg);
      console.error(errorMsg);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////

  async _renderMedia(data) {
    console.log(data);

    /* **************************************************************************** */

    const posterSrc = `${
      data.poster_path
        ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
        : ''
    }`;
    //////////////////////// /////

    await this._renderPoster(posterSrc);

    //////////////////////// /////

    this._renderDetails(data);
    //////////////////////// /////

    this._renderPerformers(data.credits);

    //////////////////////// /////

    this.#packedData = await this._asyncTasks(data.id, data.type);
    this.#packedData.forEach((data) =>
      this._renderAsyncTasks(data.label, data.results)
    );

    //  images
    await this._images(data);
    //  videos
    await this._videos(data);
    ////////////////////////

    /* ************************************************************ */
    this._screenRemoteConditions();
    /* ************************************************************ */

    this._setSlides();

    //////////////////////// //////////////////////////////////////////////////////////
    this._hideSpinnerLoading();
    this._showContent();

    /* **************************************************************************** */
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _screenRemoteConditions() {
    if (this.#images.length === 0 || this.#vidoes.length === 0) {
      screenRemoteEl.classList.add('hidden');
    }
    if (this.#images.length > 0 && this.#vidoes.length > 0) {
      screenRemoteEl.classList.remove('hidden');

      screenImagesBtn.classList.remove('active');
      screenVideosBtn.classList.add('active');

      videosDotsContainer.classList.remove('hidden');
      imagesDotsContainer.classList.add('hidden');
    }
    if (this.#images.length > 0 && this.#vidoes.length === 0) {
      slidesImagesContainer.classList.remove('hidden');
      slidesVideosContainer.classList.add('hidden');

      this.#currEl = slidesImagesContainer;

      this._setSlides();

      videosDotsContainer.classList.add('hidden');
      imagesDotsContainer.classList.remove('hidden');

      screenImagesBtn.classList.add('active');
      screenVideosBtn.classList.remove('active');
    }
    if (this.#images.length === 0 && this.#vidoes.length > 0) {
      slidesImagesContainer.classList.add('hidden');
      slidesVideosContainer.classList.remove('hidden');

      this.#currEl = slidesVideosContainer;
      this._setSlides();
      videosDotsContainer.classList.remove('hidden');
      imagesDotsContainer.classList.add('hidden');

      screenImagesBtn.classList.remove('active');
      screenVideosBtn.classList.add('active');
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////

  async _images(data) {
    let imagesSrcs = this._getImages(data);
    console.log(imagesSrcs);

    if (imagesSrcs.length < 10) {
      const moreImages = await this._getMoreImages(data.external_ids.imdb_id);
      imagesSrcs = imagesSrcs.concat(moreImages);
    }

    console.log(imagesSrcs);

    if (imagesSrcs.length > 10) {
      imagesSrcs = imagesSrcs.slice(0, 10);
    }
    ///

    this.#images = imagesSrcs;

    slidesImagesContainer.innerHTML = '';
    imagesSrcs.forEach((image, i) => this._renderimages(`${image}`, i));
    this._createDots(imagesSrcs, 'images');
    ////////////////////////
    this._renderBackImg(`${imagesSrcs[0]}`);
    /////
  }
  /////////////////////////////////////////////////////////////////////////////////////
  async _videos(data) {
    let videoSrc = await this._getVideos(data);

    if (videoSrc.length > 10) {
      videoSrc = videoSrc.slice(0, 10);
    }
    ///
    this.#vidoes = videoSrc;
    slidesVideosContainer.innerHTML = '';
    videoSrc.forEach((v, i) => this._renderVideos(`${v}`, i));
    this._createDots(videoSrc, 'videos');
    ////
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _createDots(arr, type) {
    document.querySelector(`.${type}Dots`).innerHTML = '';

    console.log(document.querySelector(`.${type}Dots`));
    if (arr.length > 1) {
      arr.forEach((v, i) => {
        const html = `<span class="dot dot--${i + 1} ${
          i + 1 === 1 ? 'active' : ''
        }"></span>`;

        document
          .querySelector(`.${type}Dots`)
          .insertAdjacentHTML('beforeend', html);

        /////
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _renderimages(src, iteration) {
    //////////*
    if (!src) return;

    const html = `<img id="" class="slide slide--${
      iteration + 1
    }" alt=""   src="${src}" style="transform:translateX(${
      iteration * 100
    }%)"/>`;
    document
      .querySelector('.slides__images')
      .insertAdjacentHTML('beforeend', html);
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _renderVideos(src, iteration) {
    // // TODO
    // slideContainer.innerHTML = '';

    // document.getElementById('slides__videos').innerHTML = '';

    //////////*
    if (!src) return;

    const html = `<iframe scrolling="no" id="iframe"
                   class="slide slide--${iteration + 1}"
                   frameborder="0" 
                   allow="accelerometer;
                   autoplay; clipboard-write; 
                   encrypted-media; gyroscope;
                   picture-in-picture; web-share" 
                   allowfullscreen="true"
                   src="${src}"
                   style="width: 100%; height: 100%; transform:translateX(${
                     iteration * 100
                   }%) ${src.includes('vimeo') ? 'scaleY(1.25)' : ''} ">
                </iframe>`;

    document
      .querySelector('.slides__videos')
      .insertAdjacentHTML('beforeend', html);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  async _asyncTasks(id, type) {
    const numPages = 6; // Set the number of pages to retrieve

    const requests = [];

    const requestsLabels = ['recommendations', 'popular'];
    //recommendations
    for (let i = 1; i <= numPages; i++) {
      requests.push(
        fetch(
          `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=2d4b842bb2345ff8f361b70262842a3d&language=en-US&page=${i}`
        )
      );
    }
    /* ************************************************************************************************* */
    // popular
    for (let i = 1; i <= numPages; i++) {
      requests.push(
        fetch(
          `https://api.themoviedb.org/3/${type}/popular?api_key=2d4b842bb2345ff8f361b70262842a3d&language=en-US&page=${i}`
        )
      );
    }

    /* ************************************************************************************************* */

    if (type === 'movie') {
      // now plying
      requestsLabels.push('now-plying');
      for (let i = 1; i <= numPages; i++) {
        requests.push(
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=2d4b842bb2345ff8f361b70262842a3d&language=en-US&page=${i}`
          )
        );
      }
    } else {
      // airing today
      requestsLabels.push('airing-today');
      for (let i = 1; i <= numPages; i++) {
        requests.push(
          fetch(
            `https://api.themoviedb.org/3/tv/airing_today?api_key=2d4b842bb2345ff8f361b70262842a3d&language=en-US&page=${i}`
          )
        );
      }
    }

    /* ************************************************************************************************* */

    if (type === 'movie') {
      // now plying
      requestsLabels.push('upcoming');
      for (let i = 1; i <= numPages; i++) {
        requests.push(
          fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=2d4b842bb2345ff8f361b70262842a3d&language=en-US&page=${i}`
          )
        );
      }
    } else {
      // airing today
      requestsLabels.push('on-tv');
      for (let i = 1; i <= numPages; i++) {
        requests.push(
          fetch(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=2d4b842bb2345ff8f361b70262842a3d&language=en-US&page=${i}`
          )
        );
      }
    }

    /* ************************************************************************************************* */

    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map((res) => res.json()));

    const packedData = [];

    let y = 0;
    for (let i = 0; i < data.length / numPages; i++) {
      const tmp = [
        {
          label: '',
          results: [],
        },
      ];

      tmp[0].label = requestsLabels[i];
      for (let x = 0; x < numPages; x++, y++) {
        tmp[0].results.push(...data[y].results);
      }
      packedData.push(tmp);
    }

    return packedData.flatMap((d) => d);
  }

  /////////////////////////////////////////////////////////////////////////////////////

  async _getVideos(data) {
    let imdbTrailer;
    if (!data.videos?.results[0] && data.external_ids.imdb_id) {
      imdbTrailer = await this._getMoreTrailer(data.external_ids.imdb_id);
      console.log('imdb trailer');
    }

    const trailer =
      data.videos?.results.find((m) => m.type === 'Trailer') ||
      data.videos?.results[data.videos?.results.length - 1];

    let videosSrcs = [];

    if (data.videos?.results[0])
      videosSrcs = data.videos?.results
        .filter((v) => v.type !== 'Trailer')
        .map((v) => {
          if (trailer?.site === 'YouTube') {
            return `https://www.youtube.com/embed/${v.key}`;
          }
          if (trailer?.site === 'Vimeo') {
            return `https://player.vimeo.com/video/${v.key}?h=d0718ccab1`;
          }
        });

    if (trailer) {
      if (trailer?.site === 'YouTube') {
        videosSrcs.unshift(`https://www.youtube.com/embed/${trailer.key}`);
        return videosSrcs;
      }
      if (trailer?.site === 'Vimeo') {
        videosSrcs.unshift(
          `https://player.vimeo.com/video/${trailer.key}?h=d0718ccab1`
        );
        return videosSrcs;
      }
    } else if (imdbTrailer?.videoId) {
      videosSrcs.unshift(
        `https://www.youtube.com/embed/${imdbTrailer?.videoId}`
      );
      return videosSrcs;
    } else return [];
  }
  /////////////////////////////////////////////////////////////////////////////////////

  async _getMoreTrailer(id) {
    const response = await fetch(
      `https://imdb-api.com/en/API/YouTubeTrailer/k_d3f2gbeq/${id}`
    );

    const responseData = await response.json();

    console.log(responseData);
    return responseData;
    ///////////
    ///////////
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _renderBackImg(src) {
    if (!src) {
      appBackEnd.style.backgroundImage = `url(${src})`;
      return;
    }
    //
    return new Promise(function (resolve) {
      const tempImg = new Image();

      tempImg.src = src;

      tempImg.addEventListener('load', function () {
        appBackEnd.style.backgroundImage = `url(${src})`;
        resolve();
      });
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _getImages(data) {
    return data.images?.backdrops[0]
      ? data.images?.backdrops.map(
          (m, i) => `https://image.tmdb.org/t/p/w780${m.file_path}`
        )
      : [];
  }
  /////////////////////////////////////////////////////////////////////////////////////
  async _getMoreImages(id) {
    try {
      const response = await fetch(
        `https://imdb-api.com/en/API/Images/k_d3f2gbeq/${id}`
      );

      const responseData = await response.json();

      return responseData.items.map((e) => {
        const index0 = e.image.indexOf('Ratio');
        return e.image.slice(0, index0) + 'SX700.jpg';
      });
    } catch (err) {
      return [];
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  async _getPopular(type) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/popular?api_key=11f65aaa9cdeb254f0857712f52aad8f&language=en-US&page=${1}`
    );

    const responseData = await response.json();

    return responseData.results;
  }
  /////////////////////////////////////////////////////////////////////////
  _renderAsyncTasks(label, arr) {
    document.querySelector(`.${label}`).innerHTML = '';
    document.querySelector(`.${label}`).scrollTop = 0;

    if (label === 'recommendations' && arr.length === 0) {
      document.querySelector(`.${label}`).closest('aside').style.display =
        'none';

      document.querySelector('.seat-booking').classList.add('recHidden');
    }
    if (label === 'recommendations' && arr.length !== 0) {
      document.querySelector(`.${label}`).closest('aside').style.display =
        'block';
      document.querySelector('.seat-booking').classList.remove('recHidden');
    }

    arr = arr.filter((e) => e.backdrop_path !== null);

    arr.forEach((s, i) => {
      const html = `<div class="recommended" data-id="${
        arr[i].id
      }" data-type="${
        arr[i].hasOwnProperty('first_air_date') ? 'tv' : 'movie'
      }" >
                 <img
                  src="https://image.tmdb.org/t/p/w400${s.backdrop_path}"
                  alt=""
                 />
                 <div class="recommended__info" style="background-image: url(https://image.tmdb.org/t/p/w400${
                   s.backdrop_path
                 });">
                  <div class="recommended__title">${
                    s?.name ? s.name : s.title
                  }</div>
                  <div class="recommended__releaseDate">${
                    s?.first_air_date ? s.first_air_date : s.release_date
                  }</div>
                 </div>
               </div>`;
      document.querySelector(`.${label}`).insertAdjacentHTML('beforeend', html);
    });

    ////////////////
    ////////////////
    ////////////////
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _intailCreditsState() {
    document
      .querySelectorAll('.Performers')
      .forEach((per) => (per.scrollTop = 0));

    castsContainer.innerHTML = '';
    CrewsContainer.innerHTML = '';

    castsContainer.classList.add('hidden');
    CrewsContainer.classList.add('hidden');

    this._hideCredits();
    this._hideSwitchBtn();
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _renderPerformers(credits) {
    ///
    // credits.cast = [];
    // credits.crew = [];

    if (credits.cast.length === 0 && credits.crew.length === 0) return;

    if (credits.cast.length !== 0 || credits.crew.length !== 0) {
      this._showCredits();
    }
    if (credits.cast.length !== 0 && credits.crew.length !== 0) {
      this._showSwitchBtn();
      castsContainer.classList.remove('hidden');
      CrewsContainer.classList.add('hidden');
      creditsLabel.textContent = 'Cast';
    }
    if (credits.cast.length === 0 && credits.crew.length !== 0) {
      castsContainer.classList.add('hidden');
      CrewsContainer.classList.remove('hidden');
      creditsLabel.textContent = 'Crew';
    }
    if (credits.cast.length !== 0 && credits.crew.length === 0) {
      castsContainer.classList.remove('hidden');
      CrewsContainer.classList.add('hidden');
      creditsLabel.textContent = 'Cast';
    }

    this._renderCasts(credits.cast);
    this._renderCrews(credits.crew);

    //////////
    //////////
    //////////
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _renderCasts(casts) {
    casts.forEach((member) => {
      const html = `<div class="member">
                     <img class="member__img"  src="${
                       member.profile_path === null
                         ? 'images/default cast.svg'
                         : `https://image.tmdb.org/t/p/w185${member.profile_path}`
                     } " alt="" />
                    <div class="member__info">
                     <span class="member__info-name">${member.name}</span>
                     <span class="member__info-charachter"> ${
                       member.character ? 'as' : ''
                     }  ${member.character}</span>
                     </div>
                 </div>`;

      castsContainer.insertAdjacentHTML('beforeend', html);
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _renderCrews(crews) {
    ///

    crews.forEach((member) => {
      const html = `<div class="member">
                     <img class="member__img"  src="${
                       member.profile_path === null
                         ? 'images/default cast.svg'
                         : `https://image.tmdb.org/t/p/w185${member.profile_path}`
                     } " alt="" />
                    <div class="member__info">
                     <span class="member__info-name">${member.name}</span>
                     <span class="member__info-charachter">  ${
                       member.job
                     }</span>
                     </div>
                 </div>`;

      CrewsContainer.insertAdjacentHTML('beforeend', html);
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////

  _renderDetails(data) {
    movieTitleLabel.textContent = `${data.title ? data.title : data.name} ${
      parseInt(data.first_air_date ? data.first_air_date : data.release_date) ||
      data.Year ||
      ''
    }`;

    ////////
    imdbRatingLabel.textContent = this._findImdbRating(data);
    RottenTomatoes__ratingLabel.textContent =
      this._findRottenTomatoesRrating(data);

    ////
    durationTimeLabel.textContent = ` ${
      data.episode_run_time ? data.episode_run_time : data.runtime
    } min`;

    /////

    releasedDateLabel.textContent = data.release_date
      ? data.release_date
      : data.first_air_date;

    releasedStatusLabel.textContent = data.status;

    /////

    GenreLabel.textContent = data.genres.map((g) => g.name).join(' / ');

    //////

    PlotSummaryLabel.textContent = data.Plot ? data.Plot : data.overview;
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _findImdbRating(data) {
    let imdbRating = data.Ratings?.find(
      (m) => m.Source === 'Internet Movie Database'
    );

    if (imdbRating) {
      return imdbRating.Value;
    } else {
      return 'N/A';
    }

    ////
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _findRottenTomatoesRrating(data) {
    let RottenTomatoesRrating = data.Ratings?.find(
      (m) => m.Source === 'Rotten Tomatoes'
    );

    if (RottenTomatoesRrating) {
      return RottenTomatoesRrating.Value;
    } else {
      return 'N/A';
    }

    ////
  }

  /////////////////////////////////////////////////////////////////////////////////////
  _renderPoster(src) {
    return new Promise(function (resolve, reject) {
      if (!src || src === 'N/A') {
        posterImg.style.visibility = 'hidden';
        resolve();
      }

      posterImg.src = src;

      posterImg.addEventListener('load', function () {
        posterImg.style.visibility = 'visible';
        resolve();
      });
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _removeSearchResult() {
    document.querySelector('.search_results').textContent = '';
    document.querySelector('.search_results').scrollTop = 0;
  }
  /////////////////////////////////////////////////////////////////////////////////////

  _hideSearchResult() {
    document.querySelector('.search_results').style.visibility = 'hidden';
  }
  /////////////////////////////////////////////////////////////////////////////////////
  _showSearchResult() {
    document.querySelector('.search_results').style.visibility = 'visible';
  }
  /////////////////////////////////////////////////////////////////////////////////////

  async _addMoreInfo(imdbId) {
    try {
      if (imdbId) {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${imdbId}&apikey=${this.#omdbapiApi}`
        );

        const responseData = await response.json();

        console.log('_addMoreInfo', responseData);
        this.#mediaDetails.Plot = responseData.Plot;
        this.#mediaDetails.Ratings = responseData.Ratings;
        this.#mediaDetails.Year = responseData.Year;
      }
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////

  async _searchResult(e) {
    e.preventDefault();
    this._showSearchResult();
    this._removeSearchResult();
    this._hideContent();

    const name = inputTextField.value.trim().toLocaleLowerCase();

    const query = name;
    const apiUrl = 'https://api.themoviedb.org/3/search/multi';
    const apiKey = '11f65aaa9cdeb254f0857712f52aad8f';
    const queryUrl = apiUrl + '?api_key=' + apiKey + '&query=' + query;
    const response = await fetch(queryUrl);

    const responseData = await response.json();

    // console.log(responseData);
    const data = responseData.results.filter((media) => {
      if (media?.name) {
        return (
          media?.name.toLocaleLowerCase().includes(`${name}`) && media?.overview
        );
      } else if (media?.title) {
        return (
          media?.title.toLocaleLowerCase().includes(`${name}`) &&
          media?.overview
        );
      }
    });
    // console.log(data);

    data.forEach((media) => {
      const html = `<div class="result"  data-id="${media.id}" data-type="${
        media.media_type
      }">
                <img
                   src="${
                     media.backdrop_path
                       ? `https://image.tmdb.org/t/p/w300/${media.backdrop_path}`
                       : ' '
                   }"
                 />
                <div class="result__details">
                  <div class="result__title">${
                    media?.name ? media?.name : media?.title
                  }</div>
                  <div class="result__release">${
                    media?.first_air_date
                      ? media?.first_air_date
                      : media?.release_date || ''
                  }</div>
                  <div class="result__overview">${media?.overview}</div>
            </div>
          </div>`;

      document
        .querySelector('.search_results')
        .insertAdjacentHTML('beforeend', html);
    });

    ////////////
  }
}

const app1 = new App();
