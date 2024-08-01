<form style={{ width: "100%" }}>
            <label>Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-2"
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <div className="input-group mb-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100"
              style={{
                backgroundColor: 'teal',
                borderColor: 'teal',
                borderRadius: '5px',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'black'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'teal'}
            >
              Submit
            </button>
          </form>