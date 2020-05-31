|%
+$  resource   [=entity =term]
+$  resources  (set resource)
::
+$  entity
  $%  [%ship =ship]
      [%ships ships=(set ship)]
      ::  [%ring ...]
  ==
::
+$  index       (list time)
+$  uid         [=resource =index]
+$  hash        @ux
+$  signature   @ux
+$  signatures  (set signature)
+$  post
  $:  author=ship
      =hash
      =index
      =signatures
      contents=(list content)
  ==
::
+$  content
  $%  [%text =cord]
      [%url =cord]
      [%code expression=cord output=(list tank)]
      [%reference =uid]
      ::  [%cage =cage]
  ==
--
