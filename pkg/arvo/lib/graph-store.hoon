/-  sur=graph-store
^?
=<  [sur .]
=,  sur
|%
++  enjs
  =,  enjs:format
  |%
  ++  update
    |=  upd=^update
    ^-  json
    |^  (frond %graph-update (pairs ~[(encode upd)]))
    ::
    ++  encode
      |=  upd=^update
      ^-  [cord json]
      [*cord *json]
    --
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  =json
    ^-  ^action
    !!
  --
--
