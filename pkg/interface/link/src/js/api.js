import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { uuid } from '/lib/util';
import { store } from '/store';
import moment from 'moment';


class UrbitApi {
  setAuthTokens(authTokens) {
    this.authTokens = authTokens;
    this.bindPaths = [];
    
    this.invite = {
      accept: this.inviteAccept.bind(this),
      decline: this.inviteDecline.bind(this),
      invite: this.inviteInvite.bind(this)
    };
  }

  bind(path, method, ship = this.authTokens.ship, app, success, fail, quit) {
    this.bindPaths = _.uniq([...this.bindPaths, path]);

    window.subscriptionId = window.urb.subscribe(ship, app, path, 
      (err) => {
        fail(err);
      },
      (event) => {
        success({
          data: event,
          from: {
            ship,
            path
          }
        });
      },
      (qui) => {
        quit(qui);
      });
  }

  action(appl, mark, data) {
    return new Promise((resolve, reject) => {
      window.urb.poke(ship, appl, mark, data,
        (json) => {
          resolve(json);
        }, 
        (err) => {
          reject(err);
        });
    });
  }

  inviteAction(data) {
    this.action("invite-store", "json", data);
  }
  
  inviteInvite(path, ship) {
    this.action("invite-hook", "json", 
      {
        invite: {
          path: '/chat',
          invite: {
            path,
            ship: `~${window.ship}`,
            recipient: ship,
            app: 'chat-hook',
            text: `You have been invited to /${window.ship}${path}`,
          },
          uid: uuid()
        }
      }
    );
  }

  inviteAccept(uid) {
    this.inviteAction({
      accept: {
        path: '/chat',
        uid
      }
    });
  }
  
  inviteDecline(uid) {
    this.inviteAction({
      decline: {
        path: '/chat',
        uid
      }
    });
  }

  async getComments(path, url, page, index) {
    let endpoint = "/~link/discussions" + path + "/" + window.btoa(url) + ".json";
    let promise = await fetch(endpoint);
    if (promise.ok) {
      let comments = {};
      comments["link-update"] = {};
      comments["link-update"].comments = {};
      comments["link-update"].comments.path = path;
      comments["link-update"].comments.page = page;
      comments["link-update"].comments.index = index;
      comments["link-update"].comments.data = await promise.json();
      store.handleEvent(comments);
    }
  }

  async postLink(path, url, title) {
    let json = 
    { 'path': path,
    'title': title,
    'url': url
  };
    let endpoint = "/~link/save";
    let post = await fetch(endpoint, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });

    if (post.ok) {
      let update = {};
      update["link-update"] = {};
      update["link-update"][path] = {};
      update["link-update"][path].add = {};
      update["link-update"][path].add = {
        "title": title, 
        "url": url, 
        "timestamp": moment.now(), 
        "ship": window.ship,
        "commentCount": 0
      }
      store.handleEvent(update);
      return true;
    } else {
      return false;
    }
  }

  async postComment(path, url, comment, page, index) {
    console.log('got the postComment')
    let json = {
      'path': path,
      'url': url,
      'udon': comment
    }

    let endpoint = "/~link/note";
    let post = await fetch(endpoint, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    });

    if (post.ok) {
      let update = {};
      update["link-update"] = {};
      update["link-update"].commentAdd = {};
      update["link-update"].commentAdd = {
        "path": path,
        "url": url,
        "udon": comment,
        "page": page,
        "index": index,
        "time": moment.now()
      }
      store.handleEvent(update);
      return true;
    } else {
      return false;
    }
  }

  sidebarToggle() {
    let sidebarBoolean = true;
    if (store.state.sidebarShown === true) {
      sidebarBoolean = false;
    }
    store.handleEvent({
      data: {
        local: {
          'sidebarToggle': sidebarBoolean
        }
      }
    });
  }

}

export let api = new UrbitApi();
window.api = api;
