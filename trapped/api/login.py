from flask import request
import trapped
import flask

@trapped.app.route('/accounts/login/', methods=['GET', 'POST'])
def login():
    connection = trapped.model.get_db()

    if request.method == "POST":
        ch = connection.execute(
            """SELECT username FROM users
            WHERE  username = ?""", (request.form["username"],)
        )
        check = ch.fetchall()
        if not bool(check):
            flask.abort(403)
        ch1 = connection.execute(
            """SELECT password as password FROM users
            WHERE username = ?""", (request.form["username"],)
        )
        check1 = ch1.fetchall()
        strp = check1[0]
        pstr = strp["password"]
        plist = pstr.split("$")
        salt = plist[1]
        algorithm = 'sha512'
        password = request.form["password"]
        hash_obj = hashlib.new(algorithm)
        password_salted = salt + password
        hash_obj.update(password_salted.encode('utf-8'))
        password_hash = hash_obj.hexdigest()
        password_db_string = "$".join([algorithm, salt, password_hash])

        if password_db_string != check1[0]["password"]:
            flask.abort(403)
        # if both username and pw match go to index after updating logname
        flask.session['logname'] = request.form["username"]
        return flask.redirect(flask.url_for('show_index'))

    return flask.render_template("login.html")
