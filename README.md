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

  <h2 align="center">Distributed Tracing Shopping Mall</h2>

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

<br />

## View Demo Video (Click below image)

[![IMAGEALTTEXT](http://img.youtube.com/vi/wYjs9WI1SF8/maxresdefault.jpg)](http://www.youtube.com/watch?v=wYjs9WI1SF8)
<br />
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

최근 몇년 사이에 MSA(마이크로서비스 아키텍처)라는 소프트웨어 아키텍처가 매우 핫하게 다루어지고 있습니다. MSA가 등장하기 이전에는 대부분 모놀리스 아키텍처라는 방식으로 소프트웨어를 설계하였습니다. 모놀리스는 업무 로직이 하나의 어플리케이션 형태로 패키징되어 서비스되는 방식으로 단순하기 때문에 개발이 쉽고 빠르지만, 서비스가 확장되고 규모가 커지면서 한계점이 드러나게 되었습니다. 대표적으로는 일부의 모듈만 변경하여도 전체 어플리케이션 개발과 운영 프로세스에 영향을 주게 된다는 것과 확장이 어렵다는 점이 있습니다.

이를 해결할 수 있는 대안책으로써 등장한 MSA방식은 애플리케이션의 로직을 작은 컴퍼넌트들로 분해하여, 최종적으로 이들을 조합해 솔루션을 제공하고 각 컴포넌트가 상호 독립적으로 배포되어 높은 유연성과 확장성을 가져갈 수 있게 되었습니다. 

![그림2](https://user-images.githubusercontent.com/14977613/169700365-5044d1be-e9af-4c5e-972d-8969006480b5.png)

다만, 이러한 MSA도 단점은 존재합니다. 기술적 어려움으로는 장애추적과 모니터링이 쉽지 않고 테스팅이 어렵다는 등의 문제가 있습니다. 또한 마이크로 서비스 하나에서 문제가 발생하면 장애가 다른 서비스들로 퍼져나갈 수도 있습니다. 더불어 기술의 적용 난이도 자체가 어렵습니다. 실제 MSA를 사용하고 있지 않은 기업들 중 절반 이상이 MSA가 유용하고 도움이 되는 기술이라고 답하면서도 MSA를 적용하지 않은 가장 큰 이유로 난이도와 관련된 이유들을 꼽았습니다.
 
저희는 MSA의 기술적 단점에서 추적과 분석이 어렵다는 점을 해결하면서도 이를 단순한 쇼핑몰로 만들어 공개함으로써 누구나 쉽게 MSA에 접근하여 학습과 적용에 이용할 수 있도록 하고자 했습니다.

쇼핑몰 앱 구현에서는 쇼핑몰을 구성하는 서비스들을 구상하고 이것들을 자바스크립트와 nodejs를 기반으로 하여 웹 서비스앱의 형태로 구현하였습니다. 서비스들은 총 10개로 결제, 상품정보 관리 등으로 쇼핑몰 기능별로 구현하였고, MSA의 특징을 잘 살리기 위해 양방향 통신이 아닌 단방향 통신이 일어나도록 설계하였습니다. 

![image](https://user-images.githubusercontent.com/14977613/169701106-461a4feb-2711-4ea6-9e9e-290c869148f0.png)
![image](https://user-images.githubusercontent.com/14977613/169701118-b91f9039-415b-42d8-9918-e01662bbcc28.png)


다음은 쿠버네티스 설정 부분입니다. 작은 기능 단위인 마이크로서비스들은 컨테이너라는 독립적이고 동적인 애플리케이션 구동 환경에서 작동하게 됩니다. 저희의 쇼핑몰 서비스들도 마이크로 서비스로써 작동을 하기 때문에, 이를 관리하기 위해 쿠버네티스를 이용하였습니다. 서비스 앱들을 모두 도커 이미지로 만들어 쿠버네티스 환경에 띄움으로써 최종적으로 MSA 기반 쇼핑몰이 작동하게 됩니다.

![image](https://user-images.githubusercontent.com/14977613/169701132-fba7c8cc-aec8-4d40-8d31-2812bab18fc1.png)


Istio설정은 MSA에서 서비스간 통신을 구성하고 다루기 위해 istio라는 서비스 메시 도구를 다루는 과정입니다. 이 서비스 메시를 구현함으로써 저희는 서버의 장애가 어느정도 자동적으로 복구되도록 하는 서킷 브레이커 기능과 로드밸런싱 기능을 구현할 수 있었습니다. 

![image](https://user-images.githubusercontent.com/14977613/169701138-aaa8c734-ed94-4a49-ad80-7570a4849c4c.png)

![image](https://user-images.githubusercontent.com/14977613/169701142-9b8e0e31-a4cf-4d0d-a381-8a8555371f4c.png)


 또한 실무에서도 많이 쓰이는 k6라는 로드제네레이터를 이용하여 자동으로 실제 환경과 유사하게, 저희가 구성한 유저 시나리오대로 주기적인 트래픽을 발생시켜 보았습니다.
 
 ![image](https://user-images.githubusercontent.com/14977613/169701146-42b55561-4741-4b62-b295-30d4a73a8dda.png)


마지막으로는 저희의 쇼핑몰의 내부 지표 데이터들을 추출하고 가시화해 보았습니다. 저희가 istio를 통해 구현한 서비스 메시에서 트래픽의 흐름을 모니터링할 수 있는 툴인 kiali를 활용하여 트래픽 흐름을 볼 수 있는 대시보드를 구성하였고 프로메테우스라는 오픈소스를 이용해서 실제 쇼핑몰 서비스 안에 존재하는 매출액/평균 매출액 등의 지표를 추출하여 대시보드로 시각화 해 보았습니다.

![image](https://user-images.githubusercontent.com/14977613/169701153-fd07f350-3181-4bd2-8ac9-a0595f29319e.png)



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
* [kubernetes](https://kubernetes.io/ko/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
* [Istio](https://istio.io/latest/docs/setup/)

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/academey/distributed_tracing_shopping_mall
   ```
2. Apply resources
   ```sh
   k apply -f cite3.yml
   ```
3. See the dashboard at kiali
   ```sh
   istioctl dashboard kiali
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap
- [ ] DB 붙이기
- [ ] Pod sacle out 설정 추가
- [ ] deployment
- [ ] Ployglot 환경으로 발전
- [ ] heml chart 관리환경으로 변경

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


<!-- ACKNOWLEDGMENTS -->
## References
- [Microservices Demo](https://github.com/GoogleCloudPlatform/microservices-demo)
- [Subicura blog](https://subicura.com/k8s/)
- [Subicura youtube](https://www.youtube.com/watch?v=Ia8IfowgU7s)
- [Istio Setup in Kubernetes](https://www.youtube.com/watch?v=voAyroDb6xk)
- [Nodejs web app docerizing](https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/)
- [Github Registry workflow](https://docs.github.com/en/packages/managing-github-packages-using-github-actions-workflows/publishing-and-installing-a-package-with-github-actions#upgrading-a-workflow-that-accesses-ghcrio)
- [k8s frontend communicate with backend](https://kubernetes.io/ko/docs/tasks/access-application-cluster/connecting-frontend-backend/#%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)
- [Node js with prometheus](https://developers.redhat.com/blog/2018/12/21/monitoring-node-js-applications-on-openshift-with-prometheus#install_prometheus)
- [Vercel commerce](https://github.com/vercel/commerce)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [k6 api load testing](https://k6.io/docs/testing-guides/api-load-testing/)

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
