FROM zenika/alpine-chrome:100-with-node-16
# Directory already exists 
# RUN mkdir /usr/src/app

ADD ./package.json /usr/src/app/package.json
ADD ./package-lock.json /usr/src/app/package-lock.json
ADD ./scripts/ci-setup /usr/src/app/scripts/ci-setup

WORKDIR /usr/src/app

RUN scripts/ci-setup
ADD . /usr/src/app
USER root
RUN chown chrome:chrome /usr/src/app/public/files -R
USER chrome

ENV PORT=3000
EXPOSE 3000

CMD scripts/ci-start