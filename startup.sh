(cd ./server && exec yarn run dev) &
(cd ./client && exec yarn run start) &&
fg 2> /dev/null
