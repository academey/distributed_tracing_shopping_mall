<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Distributed Tracing Shopping Mall</h3>

  ![그림1](https://user-images.githubusercontent.com/14977613/169700253-a99ae1ab-2705-4b63-a6ef-4999471e584a.png)
  <p align="center">
    k8s 와 istio 를 이용한 분산 추적이 가능한 쇼핑몰
    <br />
    <!-- <a href="https://github.com/academey/distributed_tracing_shopping_mall"><strong>Explore the report »</strong></a> -->
    <br />
    <br />
    <a href="https://www.youtube.com/watch?v=wYjs9WI1SF8">View Demo Video</a>
    ·
    <a href="https://github.com/academey/distributed_tracing_shopping_mall/issues">Report Bug</a>
    ·
    <a href="https://github.com/academey/distributed_tracing_shopping_mall/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![그림2](https://user-images.githubusercontent.com/14977613/169700365-5044d1be-e9af-4c5e-972d-8969006480b5.png)


최근 몇년 사이에 MSA(마이크로서비스 아키텍처)라는 소프트웨어 아키텍처가 매우 핫하게 다루어지고 있습니다. MSA가 등장하기 이전에는 대부분 모놀리스 아키텍처라는 방식으로 소프트웨어를 설계하였습니다. 모놀리스는 업무 로직이 하나의 어플리케이션 형태로 패키징되어 서비스되는 방식으로 단순하기 때문에 개발이 쉽고 빠르지만, 서비스가 확장되고 규모가 커지면서 한계점이 드러나게 되었습니다. 대표적으로는 일부의 모듈만 변경하여도 전체 어플리케이션 개발과 운영 프로세스에 영향을 주게 된다는 것과 확장이 어렵다는 점이 있습니다.

이를 해결할 수 있는 대안책으로써 등장한 MSA방식은 애플리케이션의 로직을 작은 컴퍼넌트들로 분해하여, 최종적으로 이들을 조합해 솔루션을 제공하고 각 컴포넌트가 상호 독립적으로 배포되어 높은 유연성과 확장성을 가져갈 수 있게 되었습니다. 




최신기술의 선두를 달리며 높은 적용 난이도를 가지고 있는 MSA 환경을 다루어 쇼핑몰이라는 하나의 시스템을 만들어 보았습니다. 더불어 MSA를 다루어 보면서 MSA뿐만 아니라 docker와 컨테이너부터 쿠버네티스, istio, k6, 키알리, 프로메테우스 등의 새로운 트랜드를 이끌어가는 기술들을 같이 익히고 다루어 보았습니다. 그저 다루어 보는 것을 넘어서 기존의 일반 MSA환경이 가진 단점인 분산추적과 분석과 관련된 부분을 개선해 보았고, 위에서 언급한 다양한 기술들을 저희의 의도에 맞게 적용 및 응용하여 매출이 끊기지 않게끔 하는 등의 구체적 목표를 설정하고 구현해 보기도 하였습니다. 

또한, 단순히 기술적인 것을 넘어서 현재 MSA의 학습 및 활용에 어려움을 겪고 있는 사람들이 참고하여 MSA 이용의 난이도를 낮추는데 기여할 수 있을 만한 복잡하지 않으면서도 필요한 요소는 다 갖추고 있는, 컴펙트한 MSA 프로젝트를 완성하였습니다. 


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [k8s](https://kubernetes.io/ko/)
* [Istio](https://istio.io/latest/)
* [Kiali](https://kiali.io/)
* [Prometheus](https://prometheus.io/)
* [K6](https://k6.io/)
* [Nodejs](https://nodejs.org/ko/)
* [Next.js Commerce](https://github.com/vercel/commerce)
* [Docker](https://www.docker.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* k6
  ```sh
  npm install npm@latest -g
  ```

* Istio
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/academey/distributed_tracing_shopping_mall/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/academey/distributed_tracing_shopping_mall.svg?style=for-the-badge
[contributors-url]: https://github.com/academey/distributed_tracing_shopping_mall/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/academey/distributed_tracing_shopping_mall.svg?style=for-the-badge
[forks-url]: https://github.com/academey/distributed_tracing_shopping_mall/network/members
[stars-shield]: https://img.shields.io/github/stars/academey/distributed_tracing_shopping_mall.svg?style=for-the-badge
[stars-url]: https://github.com/academey/distributed_tracing_shopping_mall/stargazers
[issues-shield]: https://img.shields.io/github/issues/academey/distributed_tracing_shopping_mall.svg?style=for-the-badge
[issues-url]: https://github.com/academey/distributed_tracing_shopping_mall/issues
[license-shield]: https://img.shields.io/github/license/academey/distributed_tracing_shopping_mall.svg?style=for-the-badge
[license-url]: https://github.com/academey/distributed_tracing_shopping_mall/blob/master/LICENSE.txt
