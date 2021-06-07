# tempoints
Plataforma para fidelización de clientes que permite registrar el tiempo de permanencia en una zona determinada.

El tiempo de permanencia se transforma en puntos que pueden ser cambiados por descuentos al momento de comprar
productos en los establecimientos afilizados que se encuentran ubicados en la zona de cobertura.

Para iniciar la aplicación se debe ejecutar el siguiente comando desde el directorio D:\Proyectos\EnBits\Repositorio\tempoints\frontend_app:
$ cd android && gradlew clean && cd .. && npx react-native run-android

React Native:
Ref: https://blog.codemagic.io/step-by-step-guide-to-kick-off-your-first-react-native-project/
Ref: https://habiletechnologies.com/blog/getting-started-react-native-complete-setup-guide/

Geofence:
Ref: https://cuttlesoft.com/blog/choosing-a-react-native-geofencing-library/
Ref: https://www.igismap.com/switching-between-google-maps-and-openstreetmap-in-react-native/
Ref: https://ugurkoysuren.medium.com/how-to-background-geo-fence-in-react-native-84b83687c614
Ref: https://github.com/mauron85/react-native-background-geolocation
Ref: https://github.com/eddieowens/react-native-boundary
Ref: https://developer.aliyun.com/mirror/npm/package/react-native-geo-fence
Ref: https://www.npmjs.com/package/react-native-background-geofencing
Ref: https://nicedoc.io/surialabs/react-native-geo-fencing
Ref: https://github.com/surialabs/react-native-geo-fencing
Ref: https://github.com/transistorsoft/react-native-background-geolocation/blob/master/help/geofencing.md
Ref: https://transistorsoft.github.io/react-native-background-geolocation/interfaces/_react_native_background_geolocation_.geofence.html
Ref: https://radar.io/
Ref: Using Geofences with React Native -> https://stackoverflow.com/questions/46265224/using-geofences-with-react-native
Ref: Using Geofences with React Native -> https://www.xspdf.com/resolution/51780499.html

# Warning: Require cycles are allowed, but can result in uninitialized values in react-native-maps
Ref: https://stackoverflow.com/questions/65058077/require-cycles-are-allowed-but-can-result-in-uninitialized-values-in-react-nati

# TypeError: undefined is not an object (evaluating 'navigator.geolocation.requestAuthorization')
Ref: https://stackoverflow.com/questions/56908771/typeerror-undefined-is-not-an-object-evaluating-navigator-geolocation-request/56909007

# Error adding geofences in Android (status code 1000)
Ref: https://stackoverflow.com/questions/19082482/error-adding-geofences-in-android-status-code-1000/27169357#27169357

#  eddieowens/react-native-boundary Got error code 1000 #7
You get GEOFENCE_NOT_AVAILABLE (code '1000') when user disagrees to "Use Google' location services" in Settings -> Location -> Mode
Ref: https://github.com/eddieowens/react-native-boundary/issues/7

# Icons are not showing up
Ref: https://github.com/oblador/react-native-vector-icons/issues/661
$ npx react-native link react-native-vector-icons

# Git
* Crear nuevo branch a partir de base_branch
$ git checkout <base_branch>
$ git branch <feature_branch>
$ git checkout <feature_branch>

* Create a branch (subbranch_of_b1) from another branch (branch1)
$ git checkout branch1
$ git checkout -b subbranch_of_b1 branch1
The above will create a new branch called subbranch_of_b1 under
the branch branch1 (note that branch1 in the above command isn't
mandatory since the HEAD is currently pointing to it, you can
precise it if you are on a different branch though).

* Clonar dos ramas diferentes a master
https://stackoverflow.com/questions/1615488/clone-just-the-stable-and-one-other-branch-in-git
$ mkdir dir_name
$ cd dir_name/
$ git init
$ git remote add -t banch_name_1 -t branch_name_2 origin http://Repository_URL/repository_name.git
$ git remote
$ git remote show origin
$ git fetch
$ git checkout -t origin/branch_name_1
$ git checkout -t origin/branch_name_2

* git checkout for remote branches
$ git remote set-branches --add origin branch_name
$ git remote
$ git remote show origin
$ git fetch
$ git checkout --track origin/branch_name

* Integraci�n (merge) de los cambios de la rama base en la rama de desarrollo
$ git checkout <feature_branch_name>
$ git merge <master_branch_name>

* Switch to another branch
$ git checkout <existing_branch>

. If the destination branch does not exist, you have to append the "-b" option,
otherwise you won't be able to switch to that branch.
$ git checkout -b <new_branch>

* Delete branch locally
$ git branch -d <localBranchName>

* Delete branch remotely
$ git push origin --delete <remoteBranchName>