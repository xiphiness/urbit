/-  *post
|%
+$  network
  $:  graphs=(map resource graph)
      tags=(set term)
      tag-queries=(map term resources)
  ==
::
+$  graph  (ordered-map time node)
+$  node   [=post replies=(unit graph)]
+$  action
  $%  [%add-graph =resource =graph]
      [%remove-graph =resource]
    ::
      [%add-nodes uids=(set [=uid =node])]
      [%remove-nodes uids=(set uid)]
    ::
      [%add-signatures =uid =signatures]
      [%remove-signatures =uid =signatures]
    ::
      [%add-tag =term =resources]
      [%remove-tag =term =resources]
  ==
::
+$  update
  $%  [%keys =resources]
      [%initial =network]
      action
  ==
      
--
